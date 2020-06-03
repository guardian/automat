package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import automat.models.{Targeting, MemoryStore, Test}
import scala.concurrent.ExecutionContext

@Singleton
class SlotsController @Inject() (val controllerComponents: ControllerComponents)(
    implicit ec: ExecutionContext
) extends BaseController {

  val store = new MemoryStore()

  def create() = Action { implicit request: Request[AnyContent] => ??? }
}
