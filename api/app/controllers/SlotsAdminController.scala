package controllers

import javax.inject._
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.{Future, ExecutionContext}
import scala.util.{Success, Failure}

import models.{Slot, Test, Validation}
import persistence.{Store}

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
    val store: Store
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

  def get(slotId: String) = Action.async { implicit request =>
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
      val updatedSlot = for {
        slot <- store.getSlot(slotId).flatMap(handleNotFound)
        updated = SlotUpdateParams.toSlot(request.body, slot)
        _ <- handleValidationErrors(Slot.validate(updated, store))
        _ <- store.updateSlot(slotId, updated)
      } yield updated

      updatedSlot.map(asSuccessResponse).recover(handleErrors)
  }

  def asSuccessResponse(slot: Slot): Result =
    Ok(Json.toJson(Map("slot" -> slot)))

  def handleErrors: PartialFunction[Throwable, Result] = {
    case ValidationException(_) => BadRequest
    case NotFoundException(_)   => NotFound
    case _                      => InternalServerError
  }

  case class ValidationException(message: String) extends Exception
  case class NotFoundException(message: String) extends Exception

  def handleNotFound[T](slotOpt: Option[T]): Future[T] = {
    toFut(slotOpt, new NotFoundException("Not found"))
  }

  def handleValidationErrors(f: Future[Validation]): Future[Unit] =
    f.transform {
      case Success(models.Success) => Success(())
      case Success(models.Failure(message)) =>
        Failure(new ValidationException(message))
      case Failure(message) => Failure(message)
    }

  def toFut[T](option: Option[T], e: Exception): Future[T] = {
    option match {
      case Some(a) => Future.successful(a)
      case _       => Future.failed(e)
    }
  }
}
