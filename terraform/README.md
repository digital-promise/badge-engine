# Terraform for Supporting Resources

Some infrastructure for the Badging Solution is provisioned and managed via the Infrastructure as code ("IaC") tool, [Terraform](https://www.terraform.io/). The [Terraform configuration language](https://developer.hashicorp.com/terraform/tutorials/configuration-language) files in this directory define the required infrastructure resources upon which the application relies.

To make sense of the file structure of this folder, it might be useful to review ["Terraform Standard Module Structure"](https://developer.hashicorp.com/terraform/language/modules/develop/structure).

## Setup 

### Install Terraform CLI
[Terraform CLI](https://developer.hashicorp.com/terraform/install?ajs_aid=f5ae386e-313c-4a70-bc30-7e30b0e72e26&product_intent=terraform)

MacOS Commands:
```
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

_Tip: Set this alias in your `.bashrc` or `.zshrc`:_

> `alias tf="terraform"`

### Sign in with Terraform cloud
Sign in to Terraform Cloud, it's used to manage Terraform state. 

You will be prompted to sign in to Terraform cloud to obtain and save an API token to use Terraform Cloud from your command line.

Run:
> `tf login`

Follow command line instructions to create a user token to login to `app.terraform.io` and save token for use later.

### Initialize working directory
This will initialize your working directory w/ the TF configuration files, install necessary plugins, and get it ready to work with Terraform.

Ensure you are in the `terraform` directory (cd `terraform`) before running the following command.

> `tf init`

On success, you will see: 
```
Terraform Cloud has been successfully initialized!

You may now begin working with Terraform Cloud. Try running "terraform plan" to
see any changes that are required for your infrastructure.

If you ever set or change modules or Terraform Settings, run "terraform init"
again to reinitialize your working directory.
```

### Terraform Workspaces
Now ensure you are in the correct tf workspace you'd like to work with (e.g. run `tf workspace select <workspace_name>` to select)
> Note: run `tf workspace list` to see a list of available workspaces.


### Run any other TF commands
Typical flow for tinkering with `.tf` files is to:

Firstly, ensure you are in the correct tf workspace you'd like to work with.

Now:
1. make edits to `.tf` files, 
2. Run `tf validate` to quickly check for errors or issues in your `.tf` files
3. then run `tf plan` to see the proposed changes to remote objects. 
4. Lastly, when changes are ready to be applied, run `tf apply`.  
5. (Optional) To tear down all infrastructure managed by Terraform, run `tf destroy` (you can label resources that you want to keep by adding the attribute [lifecycle.prevent_destroy = true](https://developer.hashicorp.com/terraform/tutorials/state/resource-lifecycle#prevent-resource-deletion) to a resource's block). 
  * Resources can also be deleted by commenting out the resource block in the `.tf` file then running `tf plan` and `tf apply`.


## Important Terraform ("tf") Commands

[`tf init`](https://developer.hashicorp.com/terraform/cli/commands/init) 
* Initializes working directory w/ TF configuration files. 
Must be run before below commands are run, and when new modules are imported.

[`tf validate`](https://developer.hashicorp.com/terraform/cli/commands/validate)
* Runs checks on TF configuration files for errors. 

[`tf plan`](https://developer.hashicorp.com/terraform/cli/commands/plan)
* Lists off resources to be created, updated, destroyed given a set of TF configuration files and imported modules

[`tf apply` ](https://developer.hashicorp.com/terraform/cli/commands/apply)
* Like `tf plan` but affords the capability to apply changes 

[`tf destroy`](https://developer.hashicorp.com/terraform/cli/commands/destroy)
* Destroys all remote objects managed by TF configuration file set

[`tf workspace <list|select>`](https://developer.hashicorp.com/terraform/cli/commands/workspace)
* Manages (create, list, delete, select) workspaces - a workspace is a logical container for your Terraform state (we use workspaces to manage multiple environments, e.g. dev, staging, prod)

## Overview of Modules 
* [aws-secrets-and-iam-role](modules/aws-secrets-and-iam-role/main.tf) - Provisions and manages a secret manager secret to harbor issuer private key, and an IAM role permissioned to read this secret
* [auth](modules/auth/main.tf) - Provisions/manages Auth0 resources necessary for using Auth0 with Badging backend - such as Auth0 tenant, customized Universal Login, login rules, and Auth0 client to interact with Badging backend.
## Notes

### Why is `.terraform.lock.hcl` committed?
The rationale behind commiting `terraform/.terraform.lock.hcl` is to prevent against [supply chain attacks](https://discuss.hashicorp.com/t/what-is-the-best-practise-with-terraform-lock-hcl-in-modules-commit-or-not/28648/2). But it's less critical as there are [complementary safeguards that Terraform utilizes.](https://discuss.hashicorp.com/t/what-is-the-best-practise-with-terraform-lock-hcl-in-modules-commit-or-not/28648/2#:~:text=However%2C%20there%20are%20other%20mechanism%20in%20place%20that%20complement%20the%20lock%20file%3A)

It is also recommended by Hashicorp to commit the file in question [because it prompts the discussion of changes to external dependencies via code review](https://developer.hashicorp.com/terraform/language/files/dependency-lock#:~:text=You%20should%20include%20this%20file%20in%20your%20version%20control%20repository%20so%20that%20you%20can%20discuss%20potential%20changes%20to%20your%20external%20dependencies%20via%20code%20review%2C%20just%20as%20you%20would%20discuss%20potential%20changes%20to%20your%20configuration%20itself.)

### Reference links
* [Google Cloud Terraform Best Practices](https://cloud.google.com/docs/terraform/best-practices-for-terraform#environment-directories)
* [Terraform Cloud](https://app.terraform.io/)