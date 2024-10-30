# Required modules b/c otherwise the resources are presumed to be in hashicorp/auth0/auth0
terraform {
  required_providers { 
    auth0 = {
      source  = "auth0/auth0"
      version = ">= 1.0.0" # Refer to docs for latest version
    }
  }
}

# __generated__ by Terraform
# Please review these resources and move them into your main configuration files.

# __generated__ by Terraform from "signup-id::en"
resource "auth0_prompt_custom_text" "en_signup_id" {
  body     = "{}"
  language = "en"
  prompt   = "signup-id"
}

# __generated__ by Terraform from "b49b217c-41a3-477c-9983-8737b2217ca8"
resource "auth0_tenant" "tenant" {
  allow_organization_name_in_authentication_api = false
  allowed_logout_urls                           = []
  customize_mfa_in_postlogin_action             = true
  default_audience                              = null
  default_directory                             = null
  default_redirection_uri                       = null
  enabled_locales                               = ["en"]
  friendly_name                                 = null
  idle_session_lifetime                         = 72
  picture_url                                   = "https://badging-build.vercel.app/_next/image?url=%2FPlaceholderCrow.png&w=384&q=75"
  sandbox_version                               = "18"
  session_lifetime                              = 168
  support_email                                 = null
  support_url                                   = null
  flags {
    allow_legacy_delegation_grant_types    = false
    allow_legacy_ro_grant_types            = false
    allow_legacy_tokeninfo_endpoint        = false
    dashboard_insights_view                = false
    dashboard_log_streams_next             = false
    disable_clickjack_protection_headers   = false
    disable_fields_map_fix                 = false
    disable_management_api_sms_obfuscation = false
    enable_adfs_waad_email_verification    = false
    enable_apis_section                    = false
    enable_client_connections              = false
    enable_custom_domain_in_emails         = false
    enable_dynamic_client_registration     = false
    # enable_idtoken_api2                    = false # TF cli doesnt allow
    enable_legacy_logs_search_v2           = false
    enable_legacy_profile                  = false
    enable_pipeline2                       = false
    enable_public_signup_user_exists_error = false
    # enable_sso                             = true # TF cli doesnt allow
    mfa_show_factor_list_on_enrollment     = true
    no_disclose_enterprise_connections     = false
    revoke_refresh_token_grant             = false
    use_scope_descriptions_for_consent     = false
  }
  session_cookie {
    mode = null
  }
  sessions {
    oidc_logout_prompt_enabled = false
  }
}

# __generated__ by Terraform from "mfa-webauthn::en"
resource "auth0_prompt_custom_text" "en_mfa_webauthn" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-webauthn"
}

# __generated__ by Terraform from "login-id::en"
resource "auth0_prompt_custom_text" "en_login_id" {
  body     = "{}"
  language = "en"
  prompt   = "login-id"
}

# __generated__ by Terraform from "mfa-otp::en"
resource "auth0_prompt_custom_text" "en_mfa_otp" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-otp"
}

# __generated__ by Terraform from "con_QfEeiAbhfDMcYqsd"
resource "auth0_connection_clients" "username_password_authentication" {
  connection_id   = auth0_connection.username_password_authentication.id
  enabled_clients = [auth0_client.crow.client_id, auth0_client.terraform_provider_auth0.client_id]
}

# __generated__ by Terraform from "device-flow::en"
resource "auth0_prompt_custom_text" "en_device_flow" {
  body     = "{}"
  language = "en"
  prompt   = "device-flow"
}

# __generated__ by Terraform from "cgr_VMlw7lrvKUEsGbao"
resource "auth0_client_grant" "client_grant_terraform_provider" {
  audience  = data.auth0_tenant.tenant_data.management_api_identifier
  client_id = auth0_client.terraform_provider_auth0.client_id
  scopes    = ["read:client_grants", "create:client_grants", "delete:client_grants", "update:client_grants", "read:users", "update:users", "delete:users", "create:users", "read:users_app_metadata", "update:users_app_metadata", "delete:users_app_metadata", "create:users_app_metadata", "read:user_custom_blocks", "create:user_custom_blocks", "delete:user_custom_blocks", "create:user_tickets", "read:clients", "update:clients", "delete:clients", "create:clients", "read:client_keys", "update:client_keys", "delete:client_keys", "create:client_keys", "read:connections", "update:connections", "delete:connections", "create:connections", "read:resource_servers", "update:resource_servers", "delete:resource_servers", "create:resource_servers", "read:device_credentials", "update:device_credentials", "delete:device_credentials", "create:device_credentials", "read:rules", "update:rules", "delete:rules", "create:rules", "read:rules_configs", "update:rules_configs", "delete:rules_configs", "read:hooks", "update:hooks", "delete:hooks", "create:hooks", "read:actions", "update:actions", "delete:actions", "create:actions", "read:email_provider", "update:email_provider", "delete:email_provider", "create:email_provider", "blacklist:tokens", "read:stats", "read:insights", "read:tenant_settings", "update:tenant_settings", "read:logs", "read:logs_users", "read:shields", "create:shields", "update:shields", "delete:shields", "read:anomaly_blocks", "delete:anomaly_blocks", "update:triggers", "read:triggers", "read:grants", "delete:grants", "read:guardian_factors", "update:guardian_factors", "read:guardian_enrollments", "delete:guardian_enrollments", "create:guardian_enrollment_tickets", "read:user_idp_tokens", "create:passwords_checking_job", "delete:passwords_checking_job", "read:custom_domains", "delete:custom_domains", "create:custom_domains", "update:custom_domains", "read:email_templates", "create:email_templates", "update:email_templates", "read:mfa_policies", "update:mfa_policies", "read:roles", "create:roles", "delete:roles", "update:roles", "read:prompts", "update:prompts", "read:branding", "update:branding", "delete:branding", "read:log_streams", "create:log_streams", "delete:log_streams", "update:log_streams", "create:signing_keys", "read:signing_keys", "update:signing_keys", "read:limits", "update:limits", "create:role_members", "read:role_members", "delete:role_members", "read:entitlements", "read:attack_protection", "update:attack_protection", "read:organizations_summary", "create:authentication_methods", "read:authentication_methods", "update:authentication_methods", "delete:authentication_methods", "read:organizations", "update:organizations", "create:organizations", "delete:organizations", "create:organization_members", "read:organization_members", "delete:organization_members", "create:organization_connections", "read:organization_connections", "update:organization_connections", "delete:organization_connections", "create:organization_member_roles", "read:organization_member_roles", "delete:organization_member_roles", "create:organization_invitations", "read:organization_invitations", "delete:organization_invitations", "read:scim_config", "create:scim_config", "update:scim_config", "delete:scim_config", "create:scim_token", "read:scim_token", "delete:scim_token", "delete:phone_providers", "create:phone_providers", "read:phone_providers", "update:phone_providers", "delete:phone_templates", "create:phone_templates", "read:phone_templates", "update:phone_templates", "create:encryption_keys", "read:encryption_keys", "update:encryption_keys", "delete:encryption_keys", "read:sessions", "delete:sessions", "read:refresh_tokens", "delete:refresh_tokens", "create:self_service_profiles", "read:self_service_profiles", "update:self_service_profiles", "delete:self_service_profiles", "create:sso_access_tickets", "read:forms", "update:forms", "delete:forms", "create:forms", "read:flows", "update:flows", "delete:flows", "create:flows", "read:flows_vault", "update:flows_vault", "delete:flows_vault", "create:flows_vault", "read:client_credentials", "create:client_credentials", "update:client_credentials", "delete:client_credentials"]
}

# __generated__ by Terraform from "lMRYgNowTyBlJSP1TNG4WYZzpnqeNPLN"
resource "auth0_client" "terraform_provider_auth0" {
  allowed_clients                       = []
  allowed_logout_urls                   = []
  allowed_origins                       = []
  app_type                              = "non_interactive"
  callbacks                             = []
  client_aliases                        = []
  client_metadata                       = {}
  cross_origin_auth                     = false
  cross_origin_loc                      = null
  custom_login_page                     = null
  custom_login_page_on                  = true
  description                           = null
  # encryption_key                        = {} # must have at least one attribute in attribute
  form_template                         = null
  grant_types                           = ["client_credentials"]
  initiate_login_uri                    = null
  is_first_party                        = true
  is_token_endpoint_ip_header_trusted   = false
  logo_uri                              = null
  name                                  = "Terraform Provider Auth0"
  oidc_backchannel_logout_urls          = []
  oidc_conformant                       = true
  organization_require_behavior         = null
  organization_usage                    = null
  require_pushed_authorization_requests = false
  sso                                   = false
  sso_disabled                          = false
  web_origins                           = []
  jwt_configuration {
    alg                 = "RS256"
    lifetime_in_seconds = 36000
    scopes              = {}
    secret_encoded      = false
  }
  refresh_token {
    expiration_type              = "non-expiring"
    idle_token_lifetime          = 2592000
    infinite_idle_token_lifetime = true
    infinite_token_lifetime      = true
    leeway                       = 0
    rotation_type                = "non-rotating"
    token_lifetime               = 31557600
  }

  lifecycle { 
    prevent_destroy = true 
  }
}

# __generated__ by Terraform from "mfa-email::en"
resource "auth0_prompt_custom_text" "en_mfa_email" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-email"
}

# __generated__ by Terraform from "mfa-voice::en"
resource "auth0_prompt_custom_text" "en_mfa_voice" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-voice"
}

# __generated__ by Terraform from "status::en"
resource "auth0_prompt_custom_text" "en_status" {
  body     = "{}"
  language = "en"
  prompt   = "status"
}

# __generated__ by Terraform from "signup-password::en"
resource "auth0_prompt_custom_text" "en_signup_password" {
  body     = "{}"
  language = "en"
  prompt   = "signup-password"
}

# __generated__ by Terraform from "reset-password::en"
resource "auth0_prompt_custom_text" "en_reset_password" {
  body     = "{}"
  language = "en"
  prompt   = "reset-password"
}

# __generated__ by Terraform from "organizations::en"
resource "auth0_prompt_custom_text" "en_organizations" {
  body     = "{}"
  language = "en"
  prompt   = "organizations"
}

# __generated__ by Terraform from "rol_jklHiO5LG0fZfisj"
resource "auth0_role" "issuer" {
  description = "Issuer role"
  name        = "Issuer"
}

# __generated__ by Terraform from "con_PO1rbyNu1EVmXQOa"
resource "auth0_connection_clients" "google_oauth2" {
  connection_id   = auth0_connection.google_oauth2.id
  enabled_clients = []
}

# __generated__ by Terraform from "consent::en"
resource "auth0_prompt_custom_text" "en_consent" {
  body     = "{}"
  language = "en"
  prompt   = "consent"
}

# __generated__ by Terraform from "mfa-push::en"
resource "auth0_prompt_custom_text" "en_mfa_push" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-push"
}

# __generated__ by Terraform from "login-password::en"
resource "auth0_prompt_custom_text" "en_login_password" {
  body     = "{}"
  language = "en"
  prompt   = "login-password"
}

# __generated__ by Terraform from "mfa-sms::en"
resource "auth0_prompt_custom_text" "en_mfa_sms" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-sms"
}

# __generated__ by Terraform from "65cc4ba8932fd5a9d3c167b5"
resource "auth0_resource_server" "auth0_management_api" {
  allow_offline_access                            = false
  enforce_policies                                = null
  identifier                                      = data.auth0_tenant.tenant_data.management_api_identifier
  name                                            = "Auth0 Management API"
  signing_alg                                     = "RS256"
  signing_secret                                  = null
  skip_consent_for_verifiable_first_party_clients = false
  token_dialect                                   = null
  token_lifetime                                  = 86400
  token_lifetime_for_web                          = 7200
  verification_location                           = null
}

# __generated__ by Terraform from "rol_4M95CyIi7LPhXDh5"
resource "auth0_role" "super_admin" {
  description = "Super admin role"
  name        = "Super Admin"
}

# __generated__ by Terraform from "8gh9YYOJZOMMMKrDmGTLoabd9vfcs0Yi"
resource "auth0_client" "crow" {
  allowed_clients                       = []
  allowed_logout_urls                   = []
  allowed_origins                       = var.auth0_client_allowed_origins
  app_type                              = "regular_web"
  callbacks                             = var.auth0_client_callbacks
  client_aliases                        = []
  client_metadata                       = {}
  cross_origin_auth                     = false
  cross_origin_loc                      = null
  custom_login_page                     = null
  custom_login_page_on                  = true
  description                           = null
  # encryption_key                        = {} # TF cli doesnt like no properties
  form_template                         = null
  grant_types                           = ["authorization_code", "implicit", "refresh_token", "client_credentials"]
  initiate_login_uri                    = var.auth0_client_initiate_login_uri
  is_first_party                        = true
  is_token_endpoint_ip_header_trusted   = false
  logo_uri                              = "https://badging-build.vercel.app/_next/static/media/crow.4cb43831.svg"
  name                                  = "Crow"
  oidc_backchannel_logout_urls          = []
  oidc_conformant                       = true
  organization_require_behavior         = "no_prompt"
  organization_usage                    = null
  require_pushed_authorization_requests = false
  sso                                   = false
  sso_disabled                          = false
  web_origins                           = var.auth0_client_allowed_origins
  jwt_configuration {
    alg                 = "RS256"
    lifetime_in_seconds = 36000
    scopes              = {}
    secret_encoded      = false
  }
  native_social_login {
    apple {
      enabled = false
    }
    facebook {
      enabled = false
    }
  }
  refresh_token {
    expiration_type              = "non-expiring"
    idle_token_lifetime          = 1296000
    infinite_idle_token_lifetime = true
    infinite_token_lifetime      = true
    leeway                       = 0
    rotation_type                = "non-rotating"
    token_lifetime               = 2592000
  }
}

# __generated__ by Terraform from "con_QfEeiAbhfDMcYqsd"
resource "auth0_connection" "username_password_authentication" {
  display_name         = null
  is_domain_connection = false
  metadata             = {}
  name                 = "Username-Password-Authentication"
  realms               = ["Username-Password-Authentication"]
  show_as_button       = null
  strategy             = "auth0"
  options {
    adfs_server            = null
    allowed_audiences      = []
    api_enable_users       = false
    app_id                 = null
    auth_params            = {}
    authorization_endpoint = null
    brute_force_protection = true
    client_id              = null
    client_secret          = null # sensitive
    community_base_url     = null
    configuration          = null # sensitive
    custom_scripts = {
      change_password = "function changePassword(email, newPassword, callback) {\n  // This script should change the password stored for the current user in your\n  // database. It is executed when the user clicks on the confirmation link\n  // after a reset password request.\n  // The content and behavior of password confirmation emails can be customized\n  // here: https://manage.auth0.com/#/emails\n  // The `newPassword` parameter of this function is in plain text. It must be\n  // hashed/salted to match whatever is stored in your database.\n  //\n  // There are three ways that this script can finish:\n  // 1. The user's password was updated successfully:\n  //     callback(null, true);\n  // 2. The user's password was not updated:\n  //     callback(null, false);\n  // 3. Something went wrong while trying to reach your database:\n  //     callback(new Error(\"my error message\"));\n  //\n  // If an error is returned, it will be passed to the query string of the page\n  // where the user is being redirected to after clicking the confirmation link.\n  // For example, returning `callback(new Error(\"error\"))` and redirecting to\n  // https://example.com would redirect to the following URL:\n  //     https://example.com?email=alice%40example.com&message=error&success=false\n\n  const msg = 'Please implement the Change Password script for this database ' +\n    'connection at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
      create          = "function create(user, callback) {\n  // This script should create a user entry in your existing database. It will\n  // be executed when a user attempts to sign up, or when a user is created\n  // through the Auth0 dashboard or API.\n  // When this script has finished executing, the Login script will be\n  // executed immediately afterwards, to verify that the user was created\n  // successfully.\n  //\n  // The user object will always contain the following properties:\n  // * email: the user's email\n  // * password: the password entered by the user, in plain text\n  // * tenant: the name of this Auth0 account\n  // * client_id: the client ID of the application where the user signed up, or\n  //              API key if created through the API or Auth0 dashboard\n  // * connection: the name of this database connection\n  //\n  // There are three ways this script can finish:\n  // 1. A user was successfully created\n  //     callback(null);\n  // 2. This user already exists in your database\n  //     callback(new ValidationError(\"user_exists\", \"my error message\"));\n  // 3. Something went wrong while trying to reach your database\n  //     callback(new Error(\"my error message\"));\n\n  const msg = 'Please implement the Create script for this database connection ' +\n    'at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
      delete          = "function remove(id, callback) {\n  // This script remove a user from your existing database.\n  // It is executed whenever a user is deleted from the API or Auth0 dashboard.\n  //\n  // There are two ways that this script can finish:\n  // 1. The user was removed successfully:\n  //     callback(null);\n  // 2. Something went wrong while trying to reach your database:\n  //     callback(new Error(\"my error message\"));\n\n  const msg = 'Please implement the Delete script for this database ' +\n    'connection at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
      get_user        = "function getByEmail(email, callback) {\n  // This script should retrieve a user profile from your existing database,\n  // without authenticating the user.\n  // It is used to check if a user exists before executing flows that do not\n  // require authentication (signup and password reset).\n  //\n  // There are three ways this script can finish:\n  // 1. A user was successfully found. The profile should be in the following\n  // format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema.\n  //     callback(null, profile);\n  // 2. A user was not found\n  //     callback(null);\n  // 3. Something went wrong while trying to reach your database:\n  //     callback(new Error(\"my error message\"));\n\n  const msg = 'Please implement the Get User script for this database connection ' +\n    'at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
      login           = "function login(email, password, callback) {\n  // This script should authenticate a user against the credentials stored in\n  // your database.\n  // It is executed when a user attempts to log in or immediately after signing\n  // up (as a verification that the user was successfully signed up).\n  //\n  // Everything returned by this script will be set as part of the user profile\n  // and will be visible by any of the tenant admins. Avoid adding attributes\n  // with values such as passwords, keys, secrets, etc.\n  //\n  // The `password` parameter of this function is in plain text. It must be\n  // hashed/salted to match whatever is stored in your database. For example:\n  //\n  //     var bcrypt = require('bcrypt@0.8.5');\n  //     bcrypt.compare(password, dbPasswordHash, function(err, res)) { ... }\n  //\n  // There are three ways this script can finish:\n  // 1. The user's credentials are valid. The returned user profile should be in\n  // the following format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema\n  //     var profile = {\n  //       user_id: ..., // user_id is mandatory\n  //       email: ...,\n  //       [...]\n  //     };\n  //     callback(null, profile);\n  // 2. The user's credentials are invalid\n  //     callback(new WrongUsernameOrPasswordError(email, \"my error message\"));\n  //\n  //    Note: Passing no arguments or a falsey first argument to\n  //    `WrongUsernameOrPasswordError` will result in the error being logged as\n  //    an `fu` event (invalid username/email) with an empty string for a user_id.\n  //    Providing a truthy first argument will result in the error being logged\n  //    as an `fp` event (the user exists, but the password is invalid) with a\n  //    user_id value of \"auth0|<first argument>\". See the `Log Event Type Codes`\n  //    documentation for more information about these event types:\n  //    https://auth0.com/docs/deploy-monitor/logs/log-event-type-codes\n  // 3. Something went wrong while trying to reach your database\n  //     callback(new Error(\"my error message\"));\n  //\n  // A list of Node.js modules which can be referenced is available here:\n  //\n  //    https://tehsis.github.io/webtaskio-canirequire/\n\n  const msg = 'Please implement the Login script for this database connection ' +\n    'at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
      verify          = "function verify(email, callback) {\n  // This script should mark the current user's email address as verified in\n  // your database.\n  // It is executed whenever a user clicks the verification link sent by email.\n  // These emails can be customized at https://manage.auth0.com/#/emails.\n  // It is safe to assume that the user's email already exists in your database,\n  // because verification emails, if enabled, are sent immediately after a\n  // successful signup.\n  //\n  // There are two ways that this script can finish:\n  // 1. The user's email was verified successfully\n  //     callback(null, true);\n  // 2. Something went wrong while trying to reach your database:\n  //     callback(new Error(\"my error message\"));\n  //\n  // If an error is returned, it will be passed to the query string of the page\n  // where the user is being redirected to after clicking the verification link.\n  // For example, returning `callback(new Error(\"error\"))` and redirecting to\n  // https://example.com would redirect to the following URL:\n  //     https://example.com?email=alice%40example.com&message=error&success=false\n\n  const msg = 'Please implement the Verify script for this database connection ' +\n    'at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
    }
    debug                                  = false
    digest_algorithm                       = null
    disable_cache                          = false
    disable_self_service_change_password   = false
    disable_sign_out                       = false
    disable_signup                         = false
    discovery_url                          = null
    domain                                 = null
    domain_aliases                         = []
    enable_script_context                  = false
    enabled_database_customization         = false
    entity_id                              = null
    fed_metadata_xml                       = null
    fields_map                             = null
    forward_request_info                   = false
    from                                   = null
    gateway_url                            = null
    icon_url                               = null
    identity_api                           = null
    import_mode                            = false
    ips                                    = []
    issuer                                 = null
    jwks_uri                               = null
    key_id                                 = null
    map_user_id_to_id                      = false
    max_groups_to_retrieve                 = null
    messaging_service_sid                  = null
    metadata_url                           = null
    metadata_xml                           = null
    name                                   = null
    non_persistent_attrs                   = []
    password_policy                        = "low"
    ping_federate_base_url                 = null
    pkce_enabled                           = false
    protocol_binding                       = null
    provider                               = null
    request_template                       = null
    requires_username                      = false
    scopes                                 = []
    scripts                                = {}
    set_user_root_attributes               = null
    should_trust_email_verified_connection = null
    sign_in_endpoint                       = null
    sign_out_endpoint                      = null
    sign_saml_request                      = false
    signature_algorithm                    = null
    signing_cert                           = null
    strategy_version                       = 0
    subject                                = null
    syntax                                 = null
    team_id                                = null
    template                               = null
    tenant_domain                          = null
    token_endpoint                         = null
    twilio_sid                             = null
    twilio_token                           = null # sensitive
    type                                   = null
    upstream_params                        = null
    use_cert_auth                          = false
    use_kerberos                           = false
    use_wsfed                              = false
    user_id_attribute                      = null
    userinfo_endpoint                      = null
    waad_common_endpoint                   = false
    waad_protocol                          = null
    mfa {
      active                 = true
      return_enroll_settings = true
    }
    password_complexity_options {
      min_length = 12
    }
    password_dictionary {
      dictionary = []
      enable     = true
    }
    password_history {
      enable = false
      size   = 5
    }
    password_no_personal_info {
      enable = true
    }
  }
}

# __generated__ by Terraform from "email-verification::en"
resource "auth0_prompt_custom_text" "en_email_verification" {
  body     = "{}"
  language = "en"
  prompt   = "email-verification"
}

# __generated__ by Terraform from "7f80e6b0-1edb-468c-91cd-03138659bcf5"
resource "auth0_guardian" "guardian" {
  email         = false
  otp           = true
  policy        = "all-applications"
  recovery_code = true
  duo {
    enabled         = false
    hostname        = null
    integration_key = null
    secret_key      = null # sensitive
  }
  phone {
    enabled       = false
    message_types = []
    provider      = null
  }
  push {
    enabled  = false
    provider = null
  }
  webauthn_platform {
    enabled                  = false
    override_relying_party   = false
    relying_party_identifier = null
  }
  webauthn_roaming {
    enabled                  = false
    override_relying_party   = false
    relying_party_identifier = null
    user_verification        = null
  }
}

# __generated__ by Terraform from "common::en"
resource "auth0_prompt_custom_text" "en_common" {
  body     = "{}"
  language = "en"
  prompt   = "common"
}

# __generated__ by Terraform from "login::en"
resource "auth0_prompt_custom_text" "en_login" {
  body     = "{}"
  language = "en"
  prompt   = "login"
}

# __generated__ by Terraform from "signup::en"
resource "auth0_prompt_custom_text" "en_signup" {
  body     = "{}"
  language = "en"
  prompt   = "signup"
}

# __generated__ by Terraform from "53f6d044-373b-429e-8994-0cfa9ea728d7"
resource "auth0_attack_protection" "attack_protection" {
  breached_password_detection {
    admin_notification_frequency = []
    enabled                      = false
    method                       = "standard"
    shields                      = []
    pre_user_registration {
      shields = []
    }
  }
  brute_force_protection {
    allowlist    = []
    enabled      = true
    max_attempts = 10
    mode         = "count_per_identifier_and_ip"
    shields      = ["block", "user_notification"]
  }
  suspicious_ip_throttling {
    allowlist = []
    enabled   = true
    shields   = ["admin_notification", "block"]
    pre_login {
      max_attempts = 100
      rate         = 864000
    }
    pre_user_registration {
      max_attempts = 50
      rate         = 1200
    }
  }
}

# __generated__ by Terraform from "mfa::en"
resource "auth0_prompt_custom_text" "en_mfa" {
  body     = "{}"
  language = "en"
  prompt   = "mfa"
}

# __generated__ by Terraform from "email-otp-challenge::en"
resource "auth0_prompt_custom_text" "en_email_otp_challenge" {
  body     = "{}"
  language = "en"
  prompt   = "email-otp-challenge"
}

# __generated__ by Terraform from "mfa-recovery-code::en"
resource "auth0_prompt_custom_text" "en_mfa_recovery_code" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-recovery-code"
}

# __generated__ by Terraform from "con_PO1rbyNu1EVmXQOa"
resource "auth0_connection" "google_oauth2" {
  display_name         = null
  is_domain_connection = false
  metadata             = {}
  name                 = "google-oauth2"
  # realms               = ["google-oauth2"]
  show_as_button       = null
  strategy             = "google-oauth2"
  options {
    adfs_server                            = null
    allowed_audiences                      = []
    api_enable_users                       = false
    app_id                                 = null
    auth_params                            = {}
    authorization_endpoint                 = null
    brute_force_protection                 = false
    client_id                              = null
    client_secret                          = null # sensitive
    community_base_url                     = null
    configuration                          = null # sensitive
    custom_scripts                         = {}
    debug                                  = false
    digest_algorithm                       = null
    disable_cache                          = false
    disable_self_service_change_password   = false
    disable_sign_out                       = false
    disable_signup                         = false
    discovery_url                          = null
    domain                                 = null
    domain_aliases                         = []
    enable_script_context                  = false
    enabled_database_customization         = false
    entity_id                              = null
    fed_metadata_xml                       = null
    fields_map                             = null
    forward_request_info                   = false
    from                                   = null
    gateway_url                            = null
    icon_url                               = null
    identity_api                           = null
    import_mode                            = false
    ips                                    = []
    issuer                                 = null
    jwks_uri                               = null
    key_id                                 = null
    map_user_id_to_id                      = false
    max_groups_to_retrieve                 = null
    messaging_service_sid                  = null
    metadata_url                           = null
    metadata_xml                           = null
    name                                   = null
    non_persistent_attrs                   = []
    password_policy                        = null
    ping_federate_base_url                 = null
    pkce_enabled                           = false
    protocol_binding                       = null
    provider                               = null
    request_template                       = null
    requires_username                      = false
    scopes                                 = ["email", "profile"]
    scripts                                = {}
    set_user_root_attributes               = null
    should_trust_email_verified_connection = null
    sign_in_endpoint                       = null
    sign_out_endpoint                      = null
    sign_saml_request                      = false
    signature_algorithm                    = null
    signing_cert                           = null
    strategy_version                       = 0
    subject                                = null
    syntax                                 = null
    team_id                                = null
    template                               = null
    tenant_domain                          = null
    token_endpoint                         = null
    twilio_sid                             = null
    twilio_token                           = null # sensitive
    type                                   = null
    upstream_params                        = null
    use_cert_auth                          = false
    use_kerberos                           = false
    use_wsfed                              = false
    user_id_attribute                      = null
    userinfo_endpoint                      = null
    waad_common_endpoint                   = false
    waad_protocol                          = null
  }
}

# __generated__ by Terraform from "86906c92-4b72-47fd-b730-40cb53daeec3"
resource "auth0_branding" "branding" {
  favicon_url = null
  logo_url    = "https://badging-build.vercel.app/_next/image?url=%2FPlaceholderCrow.png&w=384&q=75"
  colors {
    page_background = "#F4F4F4"
    primary         = "#348EC7"
  }
}

# __generated__ by Terraform from "invitation::en"
resource "auth0_prompt_custom_text" "en_invitation" {
  body     = "{}"
  language = "en"
  prompt   = "invitation"
}

# __generated__ by Terraform from "f6438a9a-4890-4e6b-9dcb-b9fbf4af75bf"
resource "auth0_pages" "pages" {
  change_password {
    enabled = false
    html    = "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\n  <title>Change your password</title>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\" />\n\n  <style type=\"text/css\">\n    body,html{\n      padding:0;\n      margin:0;\n    }\n    .table{\n      display:table;\n      position:absolute;\n      height:100%;\n      width:100%;\n      {% unless tenant.colors.page_background %}\n        background:linear-gradient(rgba(255,255,255,.3),rgba(255,255,255,0));\n      {% endunless %}\n      background-color: {{tenant.colors.page_background | default: '#e8ebef'}};\n    }\n    .cell{\n      display:table-cell;\n      vertical-align:middle;\n    }\n    .content{\n      padding:25px 0;\n      margin-left:auto;\n      margin-right:auto;\n      width:280px;\n    }\n  </style>\n\n\n</head>\n<body>\n  <div class=\"table\">\n    <div class=\"cell\">\n      <div class=\"content\">\n        <!-- WIDGET -->\n        <div id=\"change-password-widget-container\"></div>\n        <!-- END WIDGET -->\n      </div>\n    </div>\n  </div>\n\n  <script src=\"https://cdn.auth0.com/js/change-password-1.5.min.js\"></script>\n\n  <script>\n    new Auth0ChangePassword({\n      container:         \"change-password-widget-container\",                // required\n      email:             \"{{email | escape}}\",                              // DO NOT CHANGE THIS\n      csrf_token:        \"{{csrf_token}}\",                                  // DO NOT CHANGE THIS\n      ticket:            \"{{ticket}}\",                                      // DO NOT CHANGE THIS\n      password_policy:   \"{{password_policy}}\",                             // DO NOT CHANGE THIS\n      password_complexity_options:  {{password_complexity_options}},        // DO NOT CHANGE THIS\n      theme: {\n        icon: \"{{tenant.picture_url | default: '//cdn.auth0.com/styleguide/1.0.0/img/badge.png'}}\",\n        primaryColor: \"{{tenant.colors.primary | default: '#ea5323'}}\"\n      },\n      dict: {\n        // passwordPlaceholder: \"your new password\",\n        // passwordConfirmationPlaceholder: \"confirm your new password\",\n        // passwordConfirmationMatchError: \"Please ensure the password and the confirmation are the same.\",\n        // passwordStrength: {\n        //   containsAtLeast: \"Contain at least %d of the following %d types of characters:\",\n        //   identicalChars: \"No more than %d identical characters in a row (e.g., \"%s\" not allowed)\",\n        //   nonEmpty: \"Non-empty password required\",\n        //   numbers: \"Numbers (i.e. 0-9)\",\n        //   lengthAtLeast: \"At least %d characters in length\",\n        //   lowerCase: \"Lower case letters (a-z)\",\n        //   shouldContain: \"Should contain:\",\n        //   specialCharacters: \"Special characters (e.g. !@#$%^&*)\",\n        //   upperCase: \"Upper case letters (A-Z)\"\n        // },\n        // successMessage: \"Your password has been reset successfully.\",\n        // configurationError: \"An error ocurred. There appears to be a misconfiguration in the form.\",\n        // networkError: \"The server cannot be reached, there is a problem with the network.\",\n        // timeoutError: \"The server cannot be reached, please try again.\",\n        // serverError: \"There was an error processing the password reset.\",\n        // headerText: \"Enter a new password for<br />{email}\",\n        // title: \"Change Password\",\n        // weakPasswordError: \"Password is too weak.\"\n        // passwordHistoryError: \"Password has previously been used.\"\n      }\n    });\n  </script>\n</body>\n</html>\n"
  }
  login {
    enabled = false
    html    = ""
  }
}

# __generated__ by Terraform from "b88177fa-e1e4-4efb-9c0b-895e783d667d"
resource "auth0_prompt" "prompts" {
  identifier_first               = false
  universal_login_experience     = "new"
  webauthn_platform_first_factor = false
}

# __generated__ by Terraform from "login-email-verification::en"
resource "auth0_prompt_custom_text" "en_login_email_verification" {
  body     = "{}"
  language = "en"
  prompt   = "login-email-verification"
}

# __generated__ by Terraform from "rol_mPIgWvGES9IYbLR7"
resource "auth0_role" "admin" {
  description = "Admin role"
  name        = "Admin"
}

# __generated__ by Terraform from "mfa-phone::en"
resource "auth0_prompt_custom_text" "en_mfa_phone" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-phone"
}

data "auth0_tenant" "tenant_data" {}
