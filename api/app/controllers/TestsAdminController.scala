package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

import automat.models.{TestsStore, Test}

@Singleton
class TestsAdminController @Inject() (
    val controllerComponents: ControllerComponents
) extends BaseController {

  def index(slotId: String) = Action { implicit request: Request[AnyContent] =>
    val resp = Json.toJson(Map("tests" -> TestsStore.getBySlotId(slotId)))
    Ok(resp)
  }

  case class TestCreateParams(
      id: String,
      name: String,
      description: String,
      enabled: Boolean,
      variants: List[String],
      sections: List[String]
  )

  object TestCreateParams {
    implicit val testFmt = Json.format[TestCreateParams]

    def toTest(params: TestCreateParams, slotId: String): Test = Test(
      id = params.id,
      name = params.name,
      description = params.description,
      enabled = params.enabled,
      variants = params.variants,
      sections = params.sections,
      slotId = slotId
    )
  }

  def create(slotId: String) = Action(parse.json[TestCreateParams]) {
    implicit request =>
      val test = TestCreateParams.toTest(request.body, slotId)

      TestsStore.save(test)
      Ok(Json.toJson(Map("test" -> test)))
  }

  def update(testId: String) = Action { implicit request: Request[AnyContent] =>
    ???
  }

  def delete(testId: String) = Action { implicit request: Request[AnyContent] =>
    TestsStore.delete(testId)
    NoContent
  }
}
