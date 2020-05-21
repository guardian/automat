package models

case class Meta(sectionId: String)

case class FormOption(description: String, value: String, selected: Boolean)

sealed trait Element
case class TextInput(value: String) extends Element
case class TextList(values: List[String]) extends Element
case class Radio(options: List[FormOption]) extends Element
case class Select(options: List[FormOption]) extends Element

trait Filter[A <: Element] {
  def run(m: Meta, data: Option[A] = None): Boolean
}
