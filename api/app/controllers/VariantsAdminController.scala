package controllers

import javax.inject._
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.ExecutionContext

import models.{Slot, Test}
import persistence.VariantStore

class VariantsAdminController(
    val controllerComponents: ControllerComponents,
    val store: VariantStore
)(implicit ec: ExecutionContext)
    extends BaseController {

  def index = Action.async { implicit request: Request[AnyContent] =>
    val variants = store.getAllVariants()

    for {
      variants <- variants
    } yield {
      val resp = Json.toJson(Map("variants" -> variants))
      Ok(resp)
    }
  }
}
