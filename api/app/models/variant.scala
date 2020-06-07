package models

import play.api.libs.json._

case class Variant(
    id: String,
    name: String,
    description: String
)

object Variant {
  implicit val testFmt = Json.format[Variant]

  def read(json: String): Option[Variant] = {
    Json.fromJson[Variant](Json.parse(json)) match {
      case JsSuccess(variant, _) => Some(variant)
      case JsError(errors) =>
        println("unable to deserialise variant from JSON", errors, json)
        None
    }
  }
}
