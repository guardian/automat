#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as autoscaling from "@aws-cdk/aws-autoscaling";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";
import * as elasticsearch from "@aws-cdk/aws-elasticsearch";
import * as iam from "@aws-cdk/aws-iam";
import { Tag } from "@aws-cdk/core";

export class APIStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stack = new cdk.CfnParameter(this, "Stack", {
      type: "String",
      default: "frontend",
    });

    const stage = new cdk.CfnParameter(this, "Stage", {
      type: "String",
      default: "PROD",
    });

    const app = new cdk.CfnParameter(this, "App", {
      type: "String",
      default: "automat-api",
    });

    const ami = new cdk.CfnParameter(this, "AMI", {
      type: "String",
      description: "AMI ID to be provded by RiffRafff",
    });

    const vpc = new ec2.Vpc(this, "VPC");

    const tags = [
      { key: "Stack", value: stack.valueAsString },
      { key: "Stage", value: stage.valueAsString },
      { key: "App", value: app.valueAsString },
      { key: "Owner", value: "automat" },
    ];

    tags.forEach((tag) => Tag.add(this, tag.key, tag.value));

    const es = new elasticsearch.CfnDomain(this, "automat-elasticsearch", {
      domainName: "automat-elasticsearch-PROD",
      elasticsearchVersion: "7.4",
      elasticsearchClusterConfig: {
        instanceType: "r5.large.elasticsearch",
        instanceCount: 1,
      },
      accessPolicies: {},
      tags: tags,
    });

    const role = new iam.Role(this, "roll", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      inlinePolicies: {
        instancePolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              resources: [es.attrArn],
              actions: ["es:*"],
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              resources: ["arn:aws:s3:::aws-frontend-artifacts/*"],
              actions: ["s3:GetObject"],
            }),
          ],
        }),
      },
    });

    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      "aws --region eu-west-1 s3 cp s3://aws-frontend-artifacts/PROD/automat/automat_1.0-SNAPSHOT_all.deb /tmp",
      "dpkg -i /tmp/janus_1.0-SNAPSHOT_all.deb"
    );

    const asg = new autoscaling.AutoScalingGroup(this, "ASG", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.A1,
        ec2.InstanceSize.MEDIUM
      ),
      machineImage: ec2.MachineImage.genericLinux({
        "eu-west-1": ami.valueAsString,
      }),
      userData: userData,
      role: role,
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
