terraform {
  cloud {
  # https://developer.hashicorp.com/terraform/cli/cloud/settings

    organization = "digitalpromise_test"
    ## Required for Terraform Enterprise; Defaults to app.terraform.io for Terraform Cloud
    hostname = "app.terraform.io"

    workspaces {
      tags = ["badging"]
      project = "badging"
    }
  }

  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = ">= 1.0.0" # Refer to docs for latest version
    }

    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Deactivate this module for now
# module "secrets_manager_and_iam_role" {
#   source = "./modules/aws-secrets-and-iam-role"
#   issuer_private_key = var.issuer_private_key
# }

module "auth" {
  source = "./modules/auth"
  providers = {
    auth0 = auth0
  }

  auth0_client_allowed_origins = var.auth0_client_allowed_origins
  auth0_client_callbacks = var.auth0_client_callbacks
  auth0_client_initiate_login_uri = var.auth0_client_initiate_login_uri

  branding_logo = local.branding_logo
  tenant_picture = local.tenant_picture
}


