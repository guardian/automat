package controllers

import play.api.libs.json._
import play.api.mvc._

class HealthcheckController(
  val controllerComponents: ControllerComponents,
) extends BaseController {

  def get = Action {
    Ok(Json.toJson(Map("status" -> "ok")))
  }
}
