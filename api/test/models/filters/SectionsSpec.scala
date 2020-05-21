package models.filters

import org.scalatestplus.play.PlaySpec
import models.filters.Sections
import models.Meta
import models.TextList

class SectionsSpec extends PlaySpec {

  "pass when no sections specified" in {
    val m = Meta("sport")
    Sections.run(m, None) mustBe true
  }

  "pass when sections includes meta section" in {
    val m = Meta("sport")
    Sections.run(m, Some(TextList(List("culture", "sport")))) mustBe true
  }

  "fail when page section not in section whitelist" in {
    val m = Meta("sport")
    Sections.run(m, Some(TextList(List("culture", "news")))) mustBe false
  }
}
