package models

import org.scalatest.AsyncFlatSpec
import scala.concurrent.Future
import play.api.test._
import play.api.test.Helpers._

import persistence.MemoryStore

class SlotSpec extends AsyncFlatSpec {
  implicit val ec: scala.concurrent.ExecutionContext =
    scala.concurrent.ExecutionContext.global

  behavior of "validate"
  it should "return Success when the slot is valid" in {
    val store = MemoryStore()
    store.populate()
    val validSlot = Slot(
      id = "mpu",
      name = "MPU",
      tests = List(
        Test(
          id = "test",
          name = "A test",
          description = "Example test",
          isEnabled = true,
          variants = List("subsmpu"),
          author = Author(id = "example.user@guardian.co.uk", firstName = "Example", lastName = "User")
        )
      )
    )

    val futureResult = Slot.validate(validSlot, store)

    futureResult map { result => assert(result == Success) }
  }

  it should "return Failure when the slot data is not valid" in {
    val store = MemoryStore()
    val invalidSlot = Slot(
      id = "mpu",
      name = "MPU",
      tests = List(
        Test(
          id = "test",
          name = "A test",
          description = "Example test",
          isEnabled = true,
          variants = List("badVariant"),
          author = Author(id = "example.user@guardian.co.uk", firstName = "Example", lastName = "User")
        )
      )
    )

    val futureResult = Slot.validate(invalidSlot, store)

    futureResult map { result =>
      assert(result == Failure("slot references invalid variant(s)"))
    }
  }
}
