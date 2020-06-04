package automat.models

import org.apache.http.HttpHost
import org.elasticsearch.action.ActionListener
import org.elasticsearch.action.get.{GetRequest, GetResponse}
import org.elasticsearch.action.index.{IndexRequest, IndexResponse}
import org.elasticsearch.action.search.{SearchRequest, SearchResponse}
import org.elasticsearch.client.{RequestOptions, RestClient, RestHighLevelClient}
import play.api.libs.json._

import scala.concurrent.{ExecutionContext, Future, Promise}

final case class Slot(
    id: String,
    name: String,
    tests: List[Test]
)

object Slot {
  implicit val testFmt = Json.format[Slot]

  def read(json: String): Option[Slot] = {
    Json.fromJson[Slot](Json.parse(json)).asOpt
  }
}

trait SlotStore {
  def all(): Future[List[Slot]]
  def getById(id: String): Future[Option[Slot]]
  def update(slotId: String, updatedSlot: Slot): Future[Unit] // depends on insert case handling
}

class MemoryStore()(implicit ex: ExecutionContext) extends SlotStore {
  val slots = scala.collection.mutable.Map(
    "mpu" -> Slot(
      id = "mpu",
      name = "MPU",
      tests = List(
        Test(
          id = "test1",
          name = "Test 1",
          description = "example test",
          isEnabled = true,
          variants = List("foo", "bar"),
          sections = List("culture")
        ),
        Test(
          id = "test2",
          name = "Test 2",
          description = "example test",
          isEnabled = true,
          variants = List("foo", "bar"),
          sections = List("football")
        )
      )
    ),
    "bodyEnd" -> Slot(
      id = "bodyEnd",
      name = "Body End",
      tests = List(
        Test(
          id = "test3",
          name = "Test 3",
          description = "example test",
          isEnabled = true,
          variants = List("foo", "bar"),
          sections = List("culture")
        ),
        Test(
          id = "test4",
          name = "Test 4",
          description = "example test",
          isEnabled = true,
          variants = List("foo", "bar"),
          sections = List("cricket")
        )
      )
    )
  );

  def all: Future[List[Slot]] = Future.successful(slots.values.toList)

  def getById(id: String): Future[Option[Slot]] = {
    Future.successful(slots.get(id))
  }

  def update(slotId: String, updatedSlot: Slot): Future[Unit] = {
    getById(slotId).map { slot => slots(slotId) = updatedSlot }
    Future.successful(())
  }
}


class ElasticsearchStore(client: RestHighLevelClient, index: String = "slots")(
    implicit ec: ExecutionContext
) {

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

  private[this] def searchAsync(request: SearchRequest): Future[SearchResponse] = {
    val listener = new Listener[SearchResponse]
    client.searchAsync(request, RequestOptions.DEFAULT, listener)
    listener.fut
  }

  private[this] def indexAsync(request: IndexRequest): Future[IndexResponse] = {
    val listener = new Listener[IndexResponse]
    client.indexAsync(request, RequestOptions.DEFAULT, listener)
    listener.fut
  }

  def all: Future[List[Slot]] = {
    val req = new SearchRequest(index)

    searchAsync(req).map(r => {
      val docs = r.getHits().getHits().toList.map(_.getSourceAsString)
      docs.flatMap(Slot.read)
    })
  }

  def getById(id: String): Future[Option[Slot]] = {
    val req = new GetRequest(index, id)

    getAsync(req).map(response => {
      if (response.isExists()) {
        val json = response.getSourceAsString()
        Json.fromJson[Slot](Json.parse(json)).asOpt
      } else {
        None
      }
    })
  }

  def update(slotId: String, updatedSlot: Slot): Future[Unit] = {
    val json = Json.toJson(updatedSlot)
    val req = new IndexRequest(index).id(slotId).source(json)

    indexAsync(req).map(_ => ())
  }
}

// TODO support PROD configuration
object ElasticsearchStore {
  def apply(host: String = "localhost"): RestHighLevelClient = {
    val client = new RestHighLevelClient(
      RestClient.builder(
        new HttpHost(host, 9200, "http"),
        new HttpHost(host, 9201, "http")
      )
    );

    client
  }
}
