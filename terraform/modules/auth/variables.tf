variable auth0_client_allowed_origins {
  description = "Stringified list ofAuth0 client allowed origins"
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