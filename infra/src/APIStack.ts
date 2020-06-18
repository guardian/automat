#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as autoscaling from "@aws-cdk/aws-autoscaling";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";
import * as elasticsearch from "@aws-cdk/aws-elasticsearch";
import * as iam from "@aws-cdk/aws-iam";
import { Tag, Duration } from "@aws-cdk/core";

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

    const vpcId = new cdk.CfnParameter(this, "VpcId", {
      type: "AWS::EC2::VPC::Id",
      description: "VPC in which instances will run",
    });

    const publicSubnets = new cdk.CfnParameter(this, "Subnets", {
      type: "List<AWS::EC2::Subnet::Id>",
      description: "Subnets where instances will run",
    });

    const availabilityZones = new cdk.CfnParameter(this, "AZs", {
      type: "List<AWS::EC2::AvailabilityZone::Name>",
      description: "List of AZs",
    });

    const ami = new cdk.CfnParameter(this, "AMI", {
      type: "AWS::EC2::Image::Id",
      description: "AMI ID to be provded by RiffRafff",
      default: "ami-07e05aef825d2078a",
    });

    const vpc = ec2.Vpc.fromVpcAttributes(this, "vpc", {
      vpcId: vpcId.valueAsString,
      availabilityZones: availabilityZones.valueAsList,
      publicSubnetIds: publicSubnets.valueAsList,
    });

    const confBucket = new cdk.CfnParameter(this, "ConfBucket", {
      type: "String",
      description: "Bucket containing PROD conf file for app",
    });

    const tags = [
      { key: "Stack", value: stack.valueAsString },
      { key: "Stage", value: stage.valueAsString },
      { key: "App", value: app.valueAsString },
      { key: "Owner", value: "automat" },
    ];

    tags.forEach((tag) => Tag.add(this, tag.key, tag.value));

    const es = new elasticsearch.CfnDomain(this, "automat-elasticsearch", {
      domainName: "automat-elasticsearch-prod",
      elasticsearchVersion: "7.4",
      elasticsearchClusterConfig: {
        instanceType: "r5.large.elasticsearch",
        instanceCount: 1,
      },
      tags: tags,
      ebsOptions: {
        ebsEnabled: true,
        volumeSize: 60,
      },
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
              resources: [
                "arn:aws:s3:::aws-frontend-artifacts/*",
                `arn:aws:s3:::${confBucket.valueAsString}/*`,
              ],
              actions: ["s3:GetObject", "s3:HeadObject", "s3:List*"],
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              resources: ["*"],
              actions: ["ssmmessages:*", "ssm:*", "ec2messages:*", "logs:*"],
            }),
          ],
        }),
      },
    });

    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      "mkdir /etc/gu",
      `aws s3 cp s3://${confBucket.valueAsString}/${stage.valueAsString}/automat-api.private.conf /etc/gu`,
      "aws s3 cp s3://aws-frontend-artifacts/frontend/PROD/automat-api/automat-api_1.0-SNAPSHOT_all.deb /tmp",
      "dpkg -i /tmp/automat-api_1.0-SNAPSHOT_all.deb"
    );

    const asg = new autoscaling.AutoScalingGroup(this, "ASG", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3A,
        ec2.InstanceSize.SMALL
      ),
      machineImage: ec2.MachineImage.genericLinux({
        "eu-west-1": ami.valueAsString,
      }),
      userData: userData,
      role: role,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      associatePublicIpAddress: true,
      maxCapacity: 2,
    });

    const lb = new elbv2.ApplicationLoadBalancer(this, "LB", {
      vpc,
      internetFacing: true,
    });

    const listener = lb.addListener("Listener", {
      port: 80,
    });

    listener.addTargets("Target", {
      port: 9000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [asg],
      healthCheck: {
        path: "/healthcheck",
        healthyThresholdCount: 2,
        unhealthyThresholdCount: 5,
        interval: Duration.seconds(30),
        timeout: Duration.seconds(10),
      },
    });

    listener.connections.allowDefaultPortFromAnyIpv4("Open to the world");

    asg.scaleOnCpuUtilization("GT80CPU", { targetUtilizationPercent: 80 });
  }
}
