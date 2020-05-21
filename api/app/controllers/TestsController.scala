package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import automat.models.{TestsStore}

@Singleton
class TestsController @Inject() (val controllerComponents: ControllerComponents)
    extends BaseController {

  def index(slotId: String) = Action { implicit request: Request[AnyContent] =>
    val resp = Json.toJson(TestsStore.getBySlotId(slotId))
    Ok(resp)
  }

  def create(slotId: String) = Action { implicit request: Request[AnyContent] =>
    ???
  }

  def update(testId: String) = Action { implicit request: Request[AnyContent] =>
    ???
  }

  def delete(testId: String) = Action { implicit request: Request[AnyContent] =>
    TestsStore.delete(testId)
    NoContent
  }
}
