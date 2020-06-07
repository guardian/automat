package models

import play.api.libs.json._

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
}
