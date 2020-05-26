package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import automat.models.{SlotsStore, Slot}

@Singleton
class SlotsAdminController @Inject() (
    val controllerComponents: ControllerComponents
) extends BaseController {

  def index = Action { implicit request: Request[AnyContent] =>
    val resp = Json.toJson(Map("slots" -> SlotsStore.all))
    Ok(resp)
  }
}
