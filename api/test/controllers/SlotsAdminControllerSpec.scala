package controllers

import org.scalatestplus.play._
import play.api.libs.json._
import play.api.test._
import play.api.test.Helpers._

import models.{Slot, Test}
import persistence.MemoryStore

class SlotsAdminControllerSpec extends PlaySpec {
  implicit val ec: scala.concurrent.ExecutionContext =
    scala.concurrent.ExecutionContext.global

  "SlotsAdminController GET index" should {
    "return a list of variants" in {
      val store = MemoryStore()
      store.populate()
      val controller =
        new SlotsAdminController(stubControllerComponents(), store)

      val slotsIndex = controller.index().apply(FakeRequest(GET, "/"))

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

      val slotsGet = controller.get("mpu").apply(FakeRequest(GET, "/"))

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

      val slotsGet = controller.get("badSlotId").apply(FakeRequest(GET, "/"))

      status(slotsGet) mustBe NOT_FOUND
    }
  }

  def parseSlots(json: JsValue): List[SlimSlot] =
    (json \ "slots").as[List[SlimSlot]]

  def parseSlot(json: JsValue): Slot =
    (json \ "slot").as[Slot]
}
