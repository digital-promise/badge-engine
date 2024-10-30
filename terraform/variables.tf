// Variables are pulled in from Terraform cloud
variable "aws_access_key" {
    type = string
    description = "AWS access key"
}

variable "aws_secret_key" {
    type = string
    description = "AWS secret key"
}

variable "issuer_private_key" {
    type = string
    description = "Issuer private key secret string"
    sensitive = true
}

// Auth0 variables

// Auth0 TF Client
variable "auth0_domain" {
  description = "Auth0 domain"
  type        = string
  default     = "mydomain.us.auth0.com"
}

variable "auth0_client_id" {
  description = "Auth0 client ID"
  type        = string
}

variable "auth0_client_secret" {
  description = "Auth0 client secret"
  type        = string
  sensitive   = true
}

# Auth0 Crow Client created by TF
variable auth0_client_allowed_origins {
  description = "Stringified list of Auth0 client allowed origins"
  type        = list(string)
  default     = ["http://localhost:3000"]
}

variable auth0_client_callbacks {
  description = "Stringified list of Auth0 client callbacks"
  type        = list(string)
  default     = ["http://localhost:3000/api/auth/callback/auth0"]
}

variable auth0_client_initiate_login_uri {
  description = "Auth0 client initiate login uri"
  type        = string
  default     = "http://localhost:3000/api/auth/signin"
}
