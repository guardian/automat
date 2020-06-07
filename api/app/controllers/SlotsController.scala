package controllers

import persistence.SlotStore
import play.api.mvc._

import scala.concurrent.ExecutionContext

class SlotsController(
    val controllerComponents: ControllerComponents,
    val store: SlotStore
)(
    implicit ec: ExecutionContext
) extends BaseController {

  def create() = Action.async { implicit request: Request[AnyContent] => ??? }
}
