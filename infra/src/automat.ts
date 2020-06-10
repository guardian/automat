#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as autoscaling from "@aws-cdk/aws-autoscaling";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";
import * as elasticsearch from "@aws-cdk/aws-elasticsearch";

class AutomatStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "VPC");

    // ui
    new s3.Bucket(this, "automat-ui", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });

    // elasticsearch
    new elasticsearch.CfnDomain(this, "automat-elasticsearch", {
      domainName: "automat-elasticsearch-PROD",
      elasticsearchVersion: "7.4",
      elasticsearchClusterConfig: {
        instanceType: "r5.large.elasticsearch",
        instanceCount: 1,
      },
      accessPolicies: {},
    });

    // api

    const asg = new autoscaling.AutoScalingGroup(this, "ASG", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.A1,
        ec2.InstanceSize.MEDIUM
      ),
      machineImage: new ec2.AmazonLinuxImage(), // TODO make parameter
      userData: "",
      role: "", // TODO
    });

    const lb = new elbv2.ApplicationLoadBalancer(this, "LB", {
      vpc,
      internetFacing: true,
    });

    const listener = lb.addListener("Listener", {
      port: 80,
    });

    listener.addTargets("Target", {
      port: 80,
      targets: [asg],
    });

    listener.connections.allowDefaultPortFromAnyIpv4("Open to the world");

    asg.scaleOnCpuUtilization("GT80CPU", { targetUtilizationPercent: 80 });
  }
}

const app = new cdk.App();
new AutomatStack(app, "automat");
