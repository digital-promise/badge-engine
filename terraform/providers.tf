provider "aws" {
  region = "us-east-1"

  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  
  # Tags to apply to all AWS resources by default
  default_tags {
    tags = {
      Owner     = "digitalpromise"
      Project   = local.project_name
      ManagedBy = "Terraform"
    }
  }
}

provider "auth0" {
  domain        = var.auth0_domain
  client_id     = var.auth0_client_id
  client_secret = var.auth0_client_secret
}