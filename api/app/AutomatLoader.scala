import controllers._
import play.api.ApplicationLoader.Context
import play.api.mvc.EssentialFilter
import play.api._
import play.filters.HttpFiltersComponents
import play.filters.cors.CORSComponents;
import play.api.http.{HttpErrorHandler, JsonHttpErrorHandler};
import router.Routes

import persistence.Store

class AutomatLoader extends ApplicationLoader {
  def load(context: Context): Application = {
    new MyComponents(context).application
  }
}

class MyComponents(context: Context)
    extends BuiltInComponentsFromContext(context)
    with HttpFiltersComponents
    with CORSComponents {

  val store = Store(applicationLifecycle)
  val slotsController = new SlotsController(controllerComponents, store)
  val slotsAdminController =
    new SlotsAdminController(controllerComponents, store)
  val variantsAdminController =
    new VariantsAdminController(controllerComponents, store)

  val healthcheckController = new HealthcheckController(controllerComponents)

  lazy val router =
    new Routes(
      httpErrorHandler,
      healthcheckController,
      slotsAdminController,
      variantsAdminController,
      slotsController,
      ""
    )

  override def httpFilters: Seq[EssentialFilter] =
    super.httpFilters :+ corsFilter

  override lazy val httpErrorHandler =
    new JsonHttpErrorHandler(environment)
}
