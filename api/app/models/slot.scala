package automat.models

import play.api.libs.json._

final case class Slot(
    id: String,
    name: String
)

object Slot {
  implicit val testFmt = Json.format[Slot]
}

object SlotsStore {
  val mpu = Slot(id = "mpu", name = "MPU")
  val bodyEnd = Slot(id = "bodyEnd", name = "Body End")

  def all: List[Slot] = List(mpu, bodyEnd)
}
