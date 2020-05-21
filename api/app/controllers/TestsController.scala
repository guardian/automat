package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import automat.models.{TestsStore, Test}

@Singleton
class TestsController @Inject() (val controllerComponents: ControllerComponents)
    extends BaseController {

  def index(slotId: String) = Action { implicit request: Request[AnyContent] =>
    val resp = Json.toJson(Map("tests" -> TestsStore.getBySlotId(slotId)))
    Ok(resp)
  }

  def create(slotId: String) = Action(parse.json) { implicit request =>
    val testWithSlotId =
      request.body.as[JsObject] ++ JsObject(Seq("slotId" -> JsString(slotId)))

    val testResult = testWithSlotId.validate[Test]

    testResult.fold(
      errors => {
        BadRequest(Json.obj("error" -> JsError.toJson(errors)))
      },
      test => {
        TestsStore.save(test.copy(slotId = slotId))
        Ok(Json.toJson(Map("test" -> test)))
      }
    )
  }

  def update(testId: String) = Action { implicit request: Request[AnyContent] =>
    ???
  }

  def delete(testId: String) = Action { implicit request: Request[AnyContent] =>
    TestsStore.delete(testId)
    NoContent
  }
}
