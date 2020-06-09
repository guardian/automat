import org.scalatestplus.play._
import models._

class TargetingSpec extends PlaySpec {
  "findMatches" must {
    "return a list of matching tests" in {
      val targeting = new Targeting(section = "football")
      var test1 = Test(
        id = "test1",
        name = "Test 1",
        description = "example test",
        isEnabled = true,
        variants = List("foo", "bar"),
        sections = List("culture")
      )
      val test2 = Test(
        id = "test2",
        name = "Test 2",
        description = "example test",
        isEnabled = true,
        variants = List("foo", "bar"),
        sections = List("football")
      )

      val matches = Targeting.findMatches(targeting, List(test1, test2))

      matches mustBe List(test2)
    }
    "return an empty list when there are no matches" in {
      val targeting = new Targeting(section = "cycling")
      var test1 = Test(
        id = "test1",
        name = "Test 1",
        description = "example test",
        isEnabled = true,
        variants = List("foo", "bar"),
        sections = List("culture")
      )
      val test2 = Test(
        id = "test2",
        name = "Test 2",
        description = "example test",
        isEnabled = true,
        variants = List("foo", "bar"),
        sections = List("football")
      )

      val matches = Targeting.findMatches(targeting, List(test1, test2))

      matches mustBe List()
    }
  }
}
