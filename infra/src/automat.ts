#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { APIStack } from "./APIStack";
import { UIStack } from "./UIStack";

const app = new cdk.App();
new APIStack(app, "automat-api", { env: { region: "eu-west-1" } });
new UIStack(app, "automat-ui");
