package models

import play.api.libs.json._

case class Targeting(
    section: String
)

object Targeting {
  implicit val targetingFmt = Json.format[Targeting]

  def findMatches(targeting: Targeting, tests: List[Test]): List[Test] =
    tests
  // tests.filter(_.sections.contains(targeting.section))
}
