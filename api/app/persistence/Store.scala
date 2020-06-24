package persistence

import org.apache.http.HttpHost
import org.elasticsearch.action.ActionListener
import org.elasticsearch.action.get.{GetRequest, GetResponse}
import org.elasticsearch.action.index.{IndexRequest, IndexResponse}
import org.elasticsearch.action.search.{SearchRequest, SearchResponse}
import org.elasticsearch.client.{
  RequestOptions,
  RestClient,
  RestHighLevelClient
}
import org.elasticsearch.common.xcontent.XContentType
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.search.builder.SearchSourceBuilder
import play.api.inject.ApplicationLifecycle
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future, Promise}
import scala.util.{Failure, Success}

import models.{Author, Slot, Test, Variant}

trait SlotStore {
  def getAllSlots(): Future[List[Slot]]
  def getSlot(id: String): Future[Option[Slot]]
  def updateSlot(slotId: String, updatedSlot: Slot): Future[Unit]
}

trait VariantStore {
  def getAllVariants(): Future[List[Variant]]
}

trait Store extends SlotStore with VariantStore {
  // DEV method to ensure index exists and has some dummy data
  def populate(): Future[Unit]
}

object Store {
  def apply(
      lifecycle: ApplicationLifecycle
  )(implicit ec: ExecutionContext): Store = {
    val useRemoteStore = sys.env.get("USE_REMOTE_STORE").contains("true")

    try {
      val store = if (useRemoteStore) {
        ElasticsearchStore(lifecycle)
      } else {
        MemoryStore()
      }

      store.populate()
      store
    } catch {
      case e: Throwable =>
        println("unable to connect to ES", e.getMessage)
        throw e
    }
  }
}

class MemoryStore()(implicit ex: ExecutionContext) extends Store {
  var slots = Map[String, Slot]() // obviously not threadsafe
  var variants = Map[String, Variant]()

  def populate(): Future[Unit] = {
    Future.successful({
      slots = TestData.slots
      variants = TestData.variants
    })
  }

  def getAllSlots: Future[List[Slot]] = Future.successful(slots.values.toList)

  def getSlot(id: String): Future[Option[Slot]] = {
    Future.successful(slots.get(id))
  }

  def updateSlot(slotId: String, updatedSlot: Slot): Future[Unit] = {
    slots = slots + (slotId -> updatedSlot)
    Future.successful(())
  }

  def getAllVariants: Future[List[Variant]] =
    Future.successful(variants.values.toList)
}

object MemoryStore {
  def apply()(implicit ec: ExecutionContext) = new MemoryStore()
}

class ElasticsearchStore(client: RestHighLevelClient)(
    implicit ec: ExecutionContext
) extends Store {

  val slotsIndex = "slots"
  val variantsIndex = "variants"

  class Listener[A] extends ActionListener[A] {
    val p = Promise[A]()
    def onResponse(response: A): Unit = p.success(response)
    def onFailure(e: Exception): Unit = p.failure(e)
    def fut = p.future
  }

  private[this] def getAsync(request: GetRequest): Future[GetResponse] = {
    val listener = new Listener[GetResponse]
    client.getAsync(request, RequestOptions.DEFAULT, listener)
    listener.fut
  }

  private[this] def searchAsync(
      request: SearchRequest
  ): Future[SearchResponse] = {
    val listener = new Listener[SearchResponse]
    client.searchAsync(request, RequestOptions.DEFAULT, listener)
    listener.fut
  }

  private[this] def indexAsync(request: IndexRequest): Future[IndexResponse] = {
    val listener = new Listener[IndexResponse]
    client.indexAsync(request, RequestOptions.DEFAULT, listener)
    listener.fut
  }

  def populate(): Future[Unit] = {
    val responses = TestData.slots.map({
      case (id, slot) => {
        updateSlot(id, slot)
      }
    })

    val asFut = Future.sequence(responses)

    asFut.onComplete {
      case Success(_) => ()
      case Failure(e) => println("populate failed", e.getMessage, e.getCause)
    }

    Future.successful(())
  }

  def getAllSlots: Future[List[Slot]] = {
    val req = new SearchRequest(slotsIndex)
    val query = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery())
    req.source(query)

    searchAsync(req).map(r => {
      val docs = r.getHits().getHits().toList.map(_.getSourceAsString)
      docs.flatMap(Slot.read)
    })
  }

  def getSlot(id: String): Future[Option[Slot]] = {
    val req = new GetRequest(slotsIndex, id)

    getAsync(req).map(response => {
      if (response.isExists()) {
        val json = response.getSourceAsString()
        Json.fromJson[Slot](Json.parse(json)).asOpt
      } else {
        None
      }
    })
  }

  def updateSlot(slotId: String, updatedSlot: Slot): Future[Unit] = {
    val json = Json.toJson(updatedSlot).toString()
    val req =
      new IndexRequest(slotsIndex).id(slotId).source(json, XContentType.JSON)

    indexAsync(req).map(_ => ())
  }

  def getAllVariants: Future[List[Variant]] = {
    val req = new SearchRequest(variantsIndex)
    val query = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery())
    req.source(query)

    searchAsync(req).map(r => {
      val docs = r.getHits().getHits().toList.map(_.getSourceAsString)
      docs.flatMap(Variant.read)
    })
  }
}

// TODO support PROD configuration
object ElasticsearchStore {

  def apply(lifecycle: ApplicationLifecycle, host: String = "localhost")(
      implicit ec: ExecutionContext
  ): ElasticsearchStore = {
    val client = new RestHighLevelClient(
      RestClient.builder(
        new HttpHost(host, 9200, "http"),
        new HttpHost(host, 9201, "http")
      )
    )

    lifecycle.addStopHook { () =>
      println("closing Elasticsearch client...")
      Future.successful(client.close())
    }

    new ElasticsearchStore(client)
  }
}

object TestData {
  val slots = Map(
    "mpu" -> Slot(
      id = "mpu",
      name = "MPU",
      tests = List(
        Test(
          id = "test1",
          name = "Test 1",
          description = "example test",
          isEnabled = true,
          variants = List("subsmpu"),
          author = Author(
            id = "automat.dev@guardian.co.uk",
            firstName = "Automat",
            lastName = "Admin"
          )
        )
      )
    ),
    "bodyEnd" -> Slot(
      id = "bodyEnd",
      name = "Body End",
      tests = List(
        Test(
          id = "test2",
          name = "Test 2",
          description = "example test",
          isEnabled = true,
          variants = List("contributionsepic"),
          author = Author(
            id = "automat.dev@guardian.co.uk",
            firstName = "Automat",
            lastName = "Admin"
          )
        )
      )
    ),
    "banner" -> Slot(
      id = "banner",
      name = "Banner",
      tests = List(
        Test(
          id = "test3",
          name = "Test 3",
          description = "example test",
          isEnabled = true,
          variants = List("contributionsbanner"),
          author = Author(
            id = "automat.dev@guardian.co.uk",
            firstName = "Automat",
            lastName = "Admin"
          )
        ),
      )
    )
  )

  val variants = Map(
    "subsmpu" -> Variant(
      id = "subsmpu",
      name = "Subscriptions MPU",
      description = "A Guardian subscriptions advert in MPU format"
    ),
    "subsbanner" -> Variant(
      id = "subsbanner",
      name = "Subscriptions Banner",
      description = "A Guardian subscriptions advert in banner format"
    ),
    "contributionsepic" -> Variant(
      id = "contributionsepic",
      name = "Contributions Epic",
      description = "A Guardian contributions ask in epic format"
    ),
    "contributionsbanner" -> Variant(
      id = "contributionsbanner",
      name = "Contributions Banner",
      description = "A Guardian contributions ask in banner format"
    )
  )
}
