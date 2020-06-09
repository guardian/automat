package controllers

import persistence.SlotStore
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}

import models.{Targeting, Test}

class SlotsController(
    val controllerComponents: ControllerComponents,
    val store: SlotStore
)(
    implicit ec: ExecutionContext
) extends BaseController {

  def create() = Action.async { implicit request: Request[AnyContent] =>
    val targeting =
      for {
        json <- request.body.asJson
        targeting <- Json.fromJson[Targeting](json).asOpt
      } yield targeting

    targeting match {
      case Some(targeting) =>
        store.getAllSlots().map { slots =>
          val slotPairs = slots.map { slot =>
            val matchingTests = Targeting.findMatches(targeting, slot.tests)
            (slot.id -> matchingTests.headOption)
          }

          Ok(Json.toJson(slotPairs.toMap))
        }
      case None => Future.successful(BadRequest(Json.toJson(None)))
    }
  }
}
