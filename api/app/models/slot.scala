package automat.models

import play.api.libs.json._

final case class Slot(
    id: String,
    name: String,
    tests: List[Test]
)

object Slot {
  implicit val testFmt = Json.format[Slot]
}

object SlotsStore {
  val slots = scala.collection.mutable.Map(
    "mpu" -> Slot(
      id = "mpu",
      name = "MPU",
      tests = List(
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
    ),
    "bodyEnd" -> Slot(
      id = "bodyEnd",
      name = "Body End",
      tests = List(
        Test(
          id = "test3",
          name = "Test 3",
          description = "example test",
          enabled = true,
          variants = List("foo", "bar"),
          sections = List("culture")
        ),
        Test(
          id = "test4",
          name = "Test 4",
          description = "example test",
          enabled = true,
          variants = List("foo", "bar"),
          sections = List("cricket")
        )
      )
    )
  );

  def all: List[Slot] = slots.values.toList

  def getById(id: String): Option[Slot] = slots.get(id)

  def update(slotId: String, updatedSlot: Slot) = {
    getById(slotId).map { slot => slots(slotId) = updatedSlot }
  }
}
