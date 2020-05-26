package automat.models

import play.api.libs.json._

case class Test(
    id: String,
    name: String,
    slotId: String,
    description: String,
    enabled: Boolean,
    variants: List[String],
    sections: List[String]
)

object Test {
  implicit val testFmt = Json.format[Test]
}

object TestsStore {
  val tests = scala.collection.mutable.Map(
    "test1" ->
      Test(
        id = "test1",
        name = "Test 1",
        slotId = SlotsStore.bodyEnd.id,
        description = "example test",
        enabled = true,
        variants = List("foo", "bar"),
        sections = List("culture")
      ),
    "test2" -> Test(
      id = "test2",
      name = "Test 2",
      slotId = SlotsStore.bodyEnd.id,
      description = "example test",
      enabled = true,
      variants = List("foo", "bar"),
      sections = List("football")
    ),
    "test3" ->
      Test(
        id = "test3",
        name = "Test 3",
        slotId = SlotsStore.mpu.id,
        description = "example test",
        enabled = true,
        variants = List("foo", "bar"),
        sections = List("culture")
      ),
    "test4" -> Test(
      id = "test4",
      name = "Test 4",
      slotId = SlotsStore.mpu.id,
      description = "example test",
      enabled = true,
      variants = List("foo", "bar"),
      sections = List("football")
    )
  )

  def getById(id: String): Option[Test] = tests.get(id)

  def getBySlotId(slotId: String): List[Test] =
    all.filter(_.slotId == slotId)

  def all: List[Test] = tests.values.toList

  def delete(testId: String) = tests.remove(testId)

  def save(test: Test) = tests(test.id) = test
}
