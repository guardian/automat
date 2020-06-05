import controllers._
import automat.models.SlotStore
import play.api.ApplicationLoader.Context
import play.api.mvc.EssentialFilter
import play.api._
import play.filters.HttpFiltersComponents
import play.filters.cors.CORSComponents;
import play.api.http.{HttpErrorHandler, JsonHttpErrorHandler};
import router.Routes

class AutomatLoader extends ApplicationLoader {
  def load(context: Context): Application = {
    new MyComponents(context).application
  }
}

class MyComponents(context: Context)
    extends BuiltInComponentsFromContext(context)
    with HttpFiltersComponents
    with CORSComponents {

  val store = SlotStore(applicationLifecycle)
  val slotsController = new SlotsController(controllerComponents, store)
  val adminController = new SlotsAdminController(controllerComponents, store)

  lazy val router =
    new Routes(httpErrorHandler, adminController, slotsController, "")

  override def httpFilters: Seq[EssentialFilter] =
    super.httpFilters :+ corsFilter

  override lazy val httpErrorHandler =
    new JsonHttpErrorHandler(environment)
}
