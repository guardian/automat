package controllers

import org.scalatest.concurrent._
import org.scalatestplus.play._
import play.api.libs.json._
import play.api.test._
import play.api.test.Helpers._
import akka.actor.ActorSystem
import akka.stream.Materializer

import models.{Slot, Test}
import persistence.MemoryStore

class SlotsAdminControllerSpec extends PlaySpec with ScalaFutures {
  implicit val ec: scala.concurrent.ExecutionContext =
    scala.concurrent.ExecutionContext.global
  implicit val system: ActorSystem = ActorSystem()
  implicit val materializer: Materializer = Materializer(system)

  "SlotsAdminController GET index" should {
    "return a list of variants" in {
      val store = MemoryStore()
      store.populate()
      val controller =
        new SlotsAdminController(stubControllerComponents(), store)

      val slotsIndex =
        controller.index().apply(FakeRequest(GET, "/admin/slots"))

      status(slotsIndex) mustBe OK
      contentType(slotsIndex) mustBe Some("application/json")
      val slots = parseSlots(contentAsJson(slotsIndex))
      slots mustBe List(
        SlimSlot(
          id = "mpu",
          name = "MPU"
        ),
        SlimSlot(
          id = "bodyEnd",
          name = "Body End"
        )
      )
    }
  }

  "SlotsAdminController GET get" should {
    "return an individual slot when it exists" in {
      val store = MemoryStore()
      store.populate()
      val controller =
        new SlotsAdminController(stubControllerComponents(), store)

      val slotsGet =
        controller.get("mpu").apply(FakeRequest(GET, "/admin/slots/mpu"))

      status(slotsGet) mustBe OK
      contentType(slotsGet) mustBe Some("application/json")
      val slot = parseSlot(contentAsJson(slotsGet))
      slot mustBe Slot(
        id = "mpu",
        name = "MPU",
        tests = List(
          Test(
            id = "test1",
            name = "Test 1",
            description = "example test",
            isEnabled = true,
            variants = List("subsmpu"),
            sections = List("culture")
          ),
          Test(
            id = "test2",
            name = "Test 2",
            description = "example test",
            isEnabled = true,
            variants = List("subsmpu"),
            sections = List("football")
          )
        )
      )
    }

    "return a 404 when the slot doesn't exist" in {
      val store = MemoryStore()
      val controller =
        new SlotsAdminController(stubControllerComponents(), store)

      val slotsGet = controller
        .get("badSlotId")
        .apply(FakeRequest(GET, "/admin/slots/badSlotId"))

      status(slotsGet) mustBe NOT_FOUND
    }
  }

  "SlotsAdminController PATCH update" should {
    "update a slot when the payload is valid" in {
      val store = MemoryStore()
      store.populate()
      val controller =
        new SlotsAdminController(stubControllerComponents(), store)
      val test = Test(
        id = "test1",
        name = "Test 1",
        description = "example test",
        isEnabled = true,
        variants = List("subsmpu"),
        sections = List("culture")
      )
      val payload = SlotUpdateParams(tests = List(test))
      val request = FakeRequest(PATCH, "/admin/slots/mpu")
        .withBody(payload)
        .withHeaders(CONTENT_TYPE -> "application/json")

      val slotsUpdate = controller.update("mpu").apply(request)

      status(slotsUpdate) mustBe OK
      whenReady(slotsUpdate) { _ =>
        val slotOption = store.getSlot("mpu")

        whenReady(slotOption) { slotOption =>
          slotOption must not be None
          slotOption.map { slot => slot.tests mustBe List(test) }
        }
      }
    }

    "return a 400 when the payload is not valid" in {
      val store = MemoryStore()
      store.populate()
      val controller =
        new SlotsAdminController(stubControllerComponents(), store)
      val badVariantId = "badVariant"
      val test = Test(
        id = "test1",
        name = "Test 1",
        description = "example test",
        isEnabled = true,
        variants = List(badVariantId),
        sections = List("culture")
      )
      val payload = SlotUpdateParams(tests = List(test))
      val request = FakeRequest(PATCH, "/admin/slots/mpu")
        .withBody(payload)
        .withHeaders(CONTENT_TYPE -> "application/json")

      val slotsUpdate = controller.update("mpu").apply(request)

      status(slotsUpdate) mustBe BAD_REQUEST
    }

    "return a 404 when the slot doesn't exist" in {
      val store = MemoryStore()
      store.populate()
      val controller =
        new SlotsAdminController(stubControllerComponents(), store)
      val test = Test(
        id = "test1",
        name = "Test 1",
        description = "example test",
        isEnabled = true,
        variants = List("subsmpu"),
        sections = List("culture")
      )
      val payload = SlotUpdateParams(tests = List(test))
      val request = FakeRequest(PATCH, "/admin/slots/xxx")
        .withBody(payload)
        .withHeaders(CONTENT_TYPE -> "application/json")

      val slotsUpdate = controller.update("xxx").apply(request)

      status(slotsUpdate) mustBe NOT_FOUND
    }
  }

  def parseSlots(json: JsValue): List[SlimSlot] =
    (json \ "slots").as[List[SlimSlot]]

  def parseSlot(json: JsValue): Slot =
    (json \ "slot").as[Slot]
}
