package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import automat.models.{SlotsStore, Slot, Test}

case class SlimSlot(
    id: String,
    name: String
)

object SlimSlot {
  implicit val testFmt = Json.format[SlimSlot]

  def fromSlot(slot: Slot): SlimSlot =
    SlimSlot(id = slot.id, name = slot.name)
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

@Singleton
class SlotsAdminController @Inject() (
    val controllerComponents: ControllerComponents
) extends BaseController {

  def index = Action { implicit request: Request[AnyContent] =>
    val resp =
      Json.toJson(Map("slots" -> SlotsStore.all.map(SlimSlot.fromSlot)))
    Ok(resp)
  }

  def show(slotId: String) = Action { implicit request =>
    val slot = SlotsStore.getById(slotId)

    slot match {
      case Some(slot) =>
        Ok(Json.toJson(Map("slot" -> slot)))
      case None => NotFound
    }
  }

  def update(slotId: String) = Action(parse.json[SlotUpdateParams]) {
    implicit request =>
      val slot = SlotsStore.getById(slotId)

      slot match {
        case Some(slot) =>
          val updatedSlot = SlotUpdateParams.toSlot(request.body, slot)
          SlotsStore.update(slotId, updatedSlot)
          Ok(Json.toJson(Map("slot" -> updatedSlot)))
        case None => NotFound
      }
  }
}
