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

  val exampleTests = List(
    Test(
      id = "test1",
      name = "Test 1",
      description = "example test",
      enabled = true,
      variants = List("foo", "bar"),
      sections = List("culture")
    ),
    Test(
      id = "test2",
      name = "Test 2",
      description = "example test",
      enabled = true,
      variants = List("foo", "bar"),
      sections = List("football")
    )
  )
}
