package controllers

import org.scalatestplus.play._
import play.api.libs.json._
import play.api.test._
import play.api.test.Helpers._

import models.Variant
import persistence.MemoryStore

class VariantsAdminControllerSpec extends PlaySpec {
  implicit val ec: scala.concurrent.ExecutionContext =
    scala.concurrent.ExecutionContext.global

  "VariantsAdminController GET index" should {
    "return a list of variants" in {
      val store = MemoryStore()
      store.populate()
      val controller =
        new VariantsAdminController(stubControllerComponents(), store)

      val variantsIndex = controller.index().apply(FakeRequest(GET, "/"))

      status(variantsIndex) mustBe OK
      contentType(variantsIndex) mustBe Some("application/json")
      val variants = parseVariants(contentAsJson(variantsIndex))
      variants.toSet mustBe Set(
        Variant(
          id = "commercialmpu",
          name = "Commercial MPU",
          description = "A Commercial MPU for article adverts"
        ),
        Variant(
          id = "subsmpu",
          name = "Subscriptions MPU",
          description = "A Guardian subscriptions advert in MPU format"
        ),
        Variant(
          id = "subsbanner",
          name = "Subscriptions Banner",
          description = "A Guardian subscriptions advert in banner format"
        ),
        Variant(
          id = "contributionsepic",
          name = "Contributions Epic",
          description = "A Guardian contributions ask in epic format"
        ),
        Variant(
          id = "contributionsbanner",
          name = "Contributions Banner",
          description = "A Guardian contributions ask in banner format"
        )
      )
    }
  }

  def parseVariants(json: JsValue): List[Variant] =
    (json \ "variants").as[List[Variant]]
}
