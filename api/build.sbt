import com.typesafe.sbt.packager.archetypes.systemloader.SystemdPlugin
import com.typesafe.sbt.packager.archetypes.systemloader.ServerLoader.Systemd

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

javaOptions in Universal ++= Seq(
  "-Dpidfile.path=/dev/null",
  "-J-XX:+PrintGCDetails",
  "-J-XX:+PrintGCDateStamps",
  "-J-Xloggc:/var/log/${packageName.value}/gc.log",
)

debianPackageDependencies := Seq("openjdk-8-jre-headless")
maintainer := "Automat <automat.dev@theguardian.com>"
packageSummary := "Automat API"
packageDescription := """Automat API"""
serverLoading in Debian := Some(Systemd)


riffRaffPackageType := (packageBin in Debian).value
riffRaffManifestProjectName := "dotcom:automat-api"
riffRaffPackageName := "automat-api"
riffRaffUploadArtifactBucket := Option("riffraff-artifact")
riffRaffUploadManifestBucket := Option("riffraff-builds")
riffRaffArtifactResources += (file("cfn.json"), "cfn/cfn.yaml")