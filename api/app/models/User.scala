package models

import play.api.libs.json.Json

case class User(
    identityUserId: String,
    lighthouseSegment: Option[Int] = None
)

object User {
  implicit val userFmt = Json.format[User]
}
