#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import { Tag } from "@aws-cdk/core";

export class UIStack extends cdk.Stack {
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
      default: "automat-ui",
    });

    const tags = [
      { key: "Stack", value: stack.valueAsString },
      { key: "Stage", value: stage.valueAsString },
      { key: "App", value: app.valueAsString },
      { key: "Owner", value: "automat" },
    ];

    tags.forEach((tag) => Tag.add(this, tag.key, tag.value));

    new s3.Bucket(this, "automat-ui", {
      bucketName: "com-gu-automat-ui",
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
    });
  }
}
