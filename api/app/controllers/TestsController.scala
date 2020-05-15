package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import automat.models.{Test}

@Singleton
class TestsController @Inject() (val controllerComponents: ControllerComponents)
    extends BaseController {

  def index() = Action { implicit request: Request[AnyContent] =>
    val resp = Json.toJson(Test.exampleTests)
    Ok(resp)
  }
}
