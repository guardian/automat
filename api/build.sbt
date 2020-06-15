name := """automat-api"""
organization := "com.gu"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.2"

libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test
libraryDependencies += "org.scalacheck" %% "scalacheck" % "1.14.1" % Test
libraryDependencies += "org.elasticsearch.client" % "elasticsearch-rest-high-level-client" % "7.7.0"

sources in(Compile, doc) := Seq.empty

publishArtifact in(Compile, packageDoc) := false

enablePlugins(PlayScala, RiffRaffArtifact, JDebPackaging, SystemdPlugin)

riffRaffPackageType := (packageBin in Debian).value
riffRaffManifestProjectName := "frontend:automat-api"
riffRaffPackageName := "automat-api"
riffRaffUploadArtifactBucket := Option("riffraff-artifact")
riffRaffUploadManifestBucket := Option("riffraff-builds")
riffRaffArtifactResources += (file("cloudformation.yaml"), "cfn/cfn.yaml")
