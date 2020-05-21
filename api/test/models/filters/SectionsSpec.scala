package models.filters

import org.scalatestplus.play.PlaySpec
import models.filters.Sections
import models.Meta
import models.TextList
import models.FilterHelpers.sampleMeta

class SectionsSpec extends PlaySpec {

  "pass when no sections specified" in {
    val m = sampleMeta()
    Sections.run(m, None) mustBe true
  }

  "pass when sections includes meta section" in {
    val m = sampleMeta(sectionId = Some("sport"))
    Sections.run(m, Some(TextList(List("culture", "sport")))) mustBe true
  }

  "fail when page section not in section whitelist" in {
    val m = sampleMeta(sectionId = Some("sport"))
    Sections.run(m, Some(TextList(List("culture", "news")))) mustBe false
  }
}
