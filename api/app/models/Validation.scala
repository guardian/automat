package models

sealed trait Validation
final case object Success extends Validation
final case class Failure(message: String) extends Validation
