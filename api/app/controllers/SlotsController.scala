package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import automat.models.{Targeting, SlotsStore, Test}

@Singleton
class SlotsController @Inject() (val controllerComponents: ControllerComponents)
    extends BaseController {

  def create() = Action { implicit request: Request[AnyContent] =>
    val targeting = for {
      json <- request.body.asJson
      targeting <- Json.fromJson[Targeting](json).asOpt
    } yield targeting

    targeting match {
      case Some(targeting) =>
        val slotResults =
          scala.collection.mutable.Map.empty[String, Option[Test]];

        SlotsStore.all.map { slot =>
          val matchingTests = Targeting.findMatches(targeting, slot.tests)
          slotResults(slot.id) = matchingTests.headOption
        }

        Ok(Json.toJson(slotResults))
      case None => BadRequest("...")
    }
  }
}
