package models.filters

import models.{Filter, Meta}
import models.TextList

/** Sections filters by a whiltelist of sections. If no sections are specified,
  * the filter passes.
  */
object Sections extends Filter[TextList] {
  def run(m: Meta, data: Option[TextList]): Boolean = data match {
    case Some(input) => input.values.contains(m.sectionId)
    case None        => true
  }
}
