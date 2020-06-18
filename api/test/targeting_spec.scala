import org.scalatestplus.play._
import models._

class TargetingSpec extends PlaySpec {
  "findMatches" must {
    "return a list of matching tests" in {
      val targeting = new Targeting(section = "football")
      var test1 = buildTest(
        id = "test1",
        name = "Test 1"
      )
      val test2 = buildTest(
        id = "test2",
        name = "Test 2"
      )

      val matches = Targeting.findMatches(targeting, List(test1, test2))

      matches mustBe List(test1, test2)
    }
    "return an empty list when there are no matches" in {
      val targeting = new Targeting(section = "cycling")
      var test1 = buildTest(
        id = "test1",
        name = "Test 1"
      )
      val test2 = buildTest(
        id = "test2",
        name = "Test 2"
      )

      val matches = Targeting.findMatches(targeting, List(test1, test2))

      matches mustBe List(test1, test2)
    }
  }

  def buildTest(
      id: String = "test",
      name: String = "Test",
      description: String = "Example test",
      isEnabled: Boolean = true,
      variants: List[String] = List("foo", "bar"),
      author: Author = Author(
        id = "example.user@guardian.co.uk",
        firstName = "Example",
        lastName = "User"
      )
  ): Test =
    Test(
      id = id,
      name = name,
      description = description,
      isEnabled = isEnabled,
      variants = variants,
      author = author
    )
}
