package controllers

import javax.inject._
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.ExecutionContext

import models.{Slot, Test}
import persistence.{SlotStore}

case class SlimSlot(
    id: String,
    name: String,
    testCount: Int
)

object SlimSlot {
  implicit val testFmt = Json.format[SlimSlot]

  def fromSlot(slot: Slot): SlimSlot =
    SlimSlot(id = slot.id, name = slot.name, testCount = slot.tests.length)
}

case class SlotUpdateParams(
    tests: List[Test]
)

object SlotUpdateParams {
  implicit val testFmt = Json.format[SlotUpdateParams]

  def toSlot(params: SlotUpdateParams, slot: Slot): Slot = Slot(
    id = slot.id,
    name = slot.name,
    tests = params.tests
  )
}

class SlotsAdminController(
    val controllerComponents: ControllerComponents,
    val store: SlotStore
)(implicit ec: ExecutionContext)
    extends BaseController {

  def index = Action.async { implicit request: Request[AnyContent] =>
    val slots = store.getAllSlots()

    for {
      slots <- slots
    } yield {
      val resp = Json.toJson(Map("slots" -> slots.map(SlimSlot.fromSlot)))
      Ok(resp)
    }
  }

  def show(slotId: String) = Action.async { implicit request =>
    val resp = store.getSlot(slotId)

    resp map { slot =>
      slot match {
        case Some(slot) =>
          Ok(Json.toJson(Map("slot" -> slot)))
        case None => NotFound
      }
    }
  }

  def update(slotId: String) = Action.async(parse.json[SlotUpdateParams]) {
    implicit request =>
      val resp = store.getSlot(slotId)

      resp map { slot =>
        slot match {
          case Some(slot) =>
            val updatedSlot = SlotUpdateParams.toSlot(request.body, slot)
            store.updateSlot(slotId, updatedSlot)
            Ok(Json.toJson(Map("slot" -> updatedSlot)))
          case None => NotFound
        }
      }
  }
}
