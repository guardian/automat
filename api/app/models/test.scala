package models

import play.api.libs.json._

case class Author(
    id: String,
    firstName: String,
    lastName: String
)

object Author {
  implicit val authorFmt = Json.format[Author]
}

case class Test(
    id: String,
    name: String,
    description: String,
    isEnabled: Boolean,
    variants: List[String],
    author: Author
)

object Test {
  implicit val testFmt = Json.format[Test]
}
