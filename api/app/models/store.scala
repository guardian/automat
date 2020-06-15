package models

import models.{Test, User}
import scala.concurrent.Future

trait TestStore {
  def getTest(id: String): Future[Test]
  def getTests(): Future[Map[String, Test]]
}

trait UserStore {
  def getUser(identityUserId: String): Future[User]
}

object MemoryStore extends TestStore with UserStore {
  // Not thread-safe(!)
  private[this] var tests = Map(
    "test1" ->
      Test(
        id = "test1",
        name = "Test 1",
        slotId = "bodyEnd",
        description = "example test",
        enabled = true,
        variants = List("foo", "bar"),
        sections = List("culture")
      ),
    "test2" -> Test(
      id = "test2",
      name = "Test 2",
      slotId = "bodyEnd",
      description = "example test",
      enabled = true,
      variants = List("foo", "bar"),
      sections = List("football")
    ),
    "test3" ->
      Test(
        id = "test3",
        name = "Test 2",
        slotId = "cmp",
        description = "example test",
        enabled = true,
        variants = List("foo", "bar"),
        sections = List("culture")
      ),
    "test4" -> Test(
      id = "test4",
      name = "Test 4",
      slotId = "cmp",
      description = "example test",
      enabled = true,
      variants = List("foo", "bar"),
      sections = List("football")
    )
  )

  var users = Map(
    "1234" -> User(identityUserId = "1234")
  )

  def getTest(id: String): Future[Test] = Future.successful(tests(id))
  def getTests(): Future[Map[String, Test]] = Future.successful(tests)
  def archiveTest(id: String): Future[Unit] = Future.successful(())

  def getUser(identityUserId: String): Future[User] =
    Future.successful(users(identityUserId))
}
