package models

import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}

import persistence.Store

final case class Slot(
    id: String,
    name: String,
    tests: List[Test]
)

object Slot {
  implicit val testFmt = Json.format[Slot]

  def read(json: String): Option[Slot] = {
    Json.fromJson[Slot](Json.parse(json)) match {
      case JsSuccess(slot, _) => Some(slot)
      case JsError(errors) =>
        println("unable to deserialise slot from JSON", errors, json)
        None
    }
  }

  def validate(slot: Slot, store: Store)(
      implicit ec: ExecutionContext
  ): Future[Validation] = {
    val allVariantIds = store.getAllVariants()

    allVariantIds.map { allVariantIds =>
      val variantIds = slot.tests.flatMap(_.variants)

      if (variantIds.toSet.subsetOf(allVariantIds.map(_.id).toSet)) {
        Success
      } else {
        Failure("slot references invalid variant(s)")
      }
    }
  }
}
