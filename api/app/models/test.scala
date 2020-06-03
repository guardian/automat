package automat.models

import play.api.libs.json._

case class Test(
    id: String,
    name: String,
    description: String,
    enabled: Boolean,
    variants: List[String],
    sections: List[String]
)

object Test {
  implicit val testFmt = Json.format[Test]
}
