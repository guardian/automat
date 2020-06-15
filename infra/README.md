# Infra

Deployment-related code. Note, this is a helper and not part of continuous
delivery.

If you want to update the cloudformation, run:

    $ npm run cdk

This will generate and copy cfn files into the `/api` and `/ui` directories. You
can then commit and push any changes.
