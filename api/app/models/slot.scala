package automat.models

import play.api.libs.json._
import scala.concurrent.{Future, Promise}
import org.elasticsearch.client.{
  RestHighLevelClient,
  RestClientBuilder,
  RestClient
}
import org.apache.http.HttpHost
import org.elasticsearch.action.get.{GetRequest, GetRequestBuilder, GetResponse}
import org.elasticsearch.action.search.{SearchResponse, SearchRequest}
import org.elasticsearch.action.ActionListener
import org.elasticsearch.client.RequestOptions
import scala.concurrent.ExecutionContext
import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.action.search.SearchResponse
import scala.collection.JavaConverters.asScala
import org.elasticsearch.search.SearchHits

final case class Slot(
    id: String,
    name: String,
    tests: List[Test]
)

object Slot {
  implicit val testFmt = Json.format[Slot]
}

trait SlotStore {
  def all: Future[List[Slot]]
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

// https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html
// indices, documents, shards/nodes/replicas

class Listener[A] extends ActionListener[A] {
  val p = Promise[A]()
  def onResponse(response: A): Unit = p.success(response)
  def onFailure(e: Exception): Unit = p.failure(e)
  def fut = p.future
}

// https://github.com/guardian/content-api/blob/master/concierge/src/main/scala/com.gu.contentapi.concierge/elasticsearch/Elasticsearch.scala
// https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html
class ElasticsearchStore(client: RestHighLevelClient, index: String = "slots")(
    implicit ec: ExecutionContext
) {
  def listener[A](): Future[A] = {
    val p = Promise[A]()
    val listener = new ActionListener[A] {
      def onResponse(response: A): Unit = p.success(response)
      def onFailure(e: Exception): Unit = p.failure(e)
    }

    p.future
  }

  def all: Future[List[Slot]] = {
    val req = new SearchRequest(index)
    val listener = new Listener[SearchResponse]
    client.searchAsync(req, RequestOptions.DEFAULT, listener)
    listener.fut.map(response => {
      val docs = response.getHits().getHits().asScala
      ???
    })
  }

  def getById(id: String): Future[Option[Slot]] = {
    val req = new GetRequest(index, id)

    val listener = new Listener[GetResponse]
    client.getAsync(req, RequestOptions.DEFAULT, listener)

    listener.fut.map(response => {
      if (response.isExists()) {
        val json = response.getSourceAsString()
        Json.fromJson[Slot](Json.parse(json)).asOpt
      } else {
        None
      }
    })
  }

  def update(slotId: String, updatedSlot: Slot): Future[Unit] = {
    ???
  }
}

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
