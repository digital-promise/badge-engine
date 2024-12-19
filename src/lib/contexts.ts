import type { ContextDocuments } from "jsonld-document-loader";

const JSONLD_CONTEXTS: ContextDocuments = new Map();

JSONLD_CONTEXTS.set("https://www.w3.org/ns/credentials/v2", {
  "@context": {
    "@protected": true,

    id: "@id",
    type: "@type",

    description: "https://schema.org/description",
    digestMultibase: {
      "@id": "https://w3id.org/security#digestMultibase",
      "@type": "https://w3id.org/security#multibase",
    },
    digestSRI: {
      "@id": "https://www.w3.org/2018/credentials#digestSRI",
      "@type": "https://www.w3.org/2018/credentials#sriString",
    },
    mediaType: {
      "@id": "https://schema.org/encodingFormat",
    },
    name: "https://schema.org/name",

    VerifiableCredential: {
      "@id": "https://www.w3.org/2018/credentials#VerifiableCredential",
      "@context": {
        "@protected": true,

        id: "@id",
        type: "@type",

        confidenceMethod: {
          "@id": "https://www.w3.org/2018/credentials#confidenceMethod",
          "@type": "@id",
        },
        credentialSchema: {
          "@id": "https://www.w3.org/2018/credentials#credentialSchema",
          "@type": "@id",
        },
        credentialStatus: {
          "@id": "https://www.w3.org/2018/credentials#credentialStatus",
          "@type": "@id",
        },
        credentialSubject: {
          "@id": "https://www.w3.org/2018/credentials#credentialSubject",
          "@type": "@id",
        },
        description: "https://schema.org/description",
        evidence: {
          "@id": "https://www.w3.org/2018/credentials#evidence",
          "@type": "@id",
        },
        issuer: {
          "@id": "https://www.w3.org/2018/credentials#issuer",
          "@type": "@id",
        },
        name: "https://schema.org/name",
        proof: {
          "@id": "https://w3id.org/security#proof",
          "@type": "@id",
          "@container": "@graph",
        },
        refreshService: {
          "@id": "https://www.w3.org/2018/credentials#refreshService",
          "@type": "@id",
        },
        relatedResource: {
          "@id": "https://www.w3.org/2018/credentials#relatedResource",
          "@type": "@id",
        },
        renderMethod: {
          "@id": "https://www.w3.org/2018/credentials#renderMethod",
          "@type": "@id",
        },
        termsOfUse: {
          "@id": "https://www.w3.org/2018/credentials#termsOfUse",
          "@type": "@id",
        },
        validFrom: {
          "@id": "https://www.w3.org/2018/credentials#validFrom",
          "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        },
        validUntil: {
          "@id": "https://www.w3.org/2018/credentials#validUntil",
          "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        },
      },
    },

    EnvelopedVerifiableCredential:
      "https://www.w3.org/2018/credentials#EnvelopedVerifiableCredential",

    VerifiablePresentation: {
      "@id": "https://www.w3.org/2018/credentials#VerifiablePresentation",
      "@context": {
        "@protected": true,

        id: "@id",
        type: "@type",

        holder: {
          "@id": "https://www.w3.org/2018/credentials#holder",
          "@type": "@id",
        },
        proof: {
          "@id": "https://w3id.org/security#proof",
          "@type": "@id",
          "@container": "@graph",
        },
        termsOfUse: {
          "@id": "https://www.w3.org/2018/credentials#termsOfUse",
          "@type": "@id",
        },
        verifiableCredential: {
          "@id": "https://www.w3.org/2018/credentials#verifiableCredential",
          "@type": "@id",
          "@container": "@graph",
        },
      },
    },

    EnvelopedVerifiablePresentation:
      "https://www.w3.org/2018/credentials#EnvelopedVerifiablePresentation",

    JsonSchemaCredential:
      "https://www.w3.org/2018/credentials#JsonSchemaCredential",

    JsonSchema: {
      "@id": "https://www.w3.org/2018/credentials#JsonSchema",
      "@context": {
        "@protected": true,

        id: "@id",
        type: "@type",

        jsonSchema: {
          "@id": "https://www.w3.org/2018/credentials#jsonSchema",
          "@type": "@json",
        },
      },
    },

    BitstringStatusListCredential:
      "https://www.w3.org/ns/credentials/status#BitstringStatusListCredential",

    BitstringStatusList: {
      "@id": "https://www.w3.org/ns/credentials/status#BitstringStatusList",
      "@context": {
        "@protected": true,

        id: "@id",
        type: "@type",

        encodedList: {
          "@id": "https://www.w3.org/ns/credentials/status#encodedList",
          "@type": "https://w3id.org/security#multibase",
        },
        statusMessage: {
          "@id": "https://www.w3.org/ns/credentials/status#statusMessage",
          "@context": {
            "@protected": true,

            id: "@id",
            type: "@type",

            message: "https://www.w3.org/ns/credentials/status#message",
            status: "https://www.w3.org/ns/credentials/status#status",
          },
        },
        statusPurpose: "https://www.w3.org/ns/credentials/status#statusPurpose",
        statusReference: {
          "@id": "https://www.w3.org/ns/credentials/status#statusReference",
          "@type": "@id",
        },
        statusSize: {
          "@id": "https://www.w3.org/ns/credentials/status#statusSize",
          "@type": "https://www.w3.org/2001/XMLSchema#positiveInteger",
        },
        ttl: "https://www.w3.org/ns/credentials/status#ttl",
      },
    },

    BitstringStatusListEntry: {
      "@id":
        "https://www.w3.org/ns/credentials/status#BitstringStatusListEntry",
      "@context": {
        "@protected": true,

        id: "@id",
        type: "@type",

        statusListCredential: {
          "@id":
            "https://www.w3.org/ns/credentials/status#statusListCredential",
          "@type": "@id",
        },
        statusListIndex:
          "https://www.w3.org/ns/credentials/status#statusListIndex",
        statusPurpose: "https://www.w3.org/ns/credentials/status#statusPurpose",
      },
    },

    DataIntegrityProof: {
      "@id": "https://w3id.org/security#DataIntegrityProof",
      "@context": {
        "@protected": true,

        id: "@id",
        type: "@type",

        challenge: "https://w3id.org/security#challenge",
        created: {
          "@id": "http://purl.org/dc/terms/created",
          "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        },
        cryptosuite: {
          "@id": "https://w3id.org/security#cryptosuite",
          "@type": "https://w3id.org/security#cryptosuiteString",
        },
        domain: "https://w3id.org/security#domain",
        expires: {
          "@id": "https://w3id.org/security#expiration",
          "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        },
        nonce: "https://w3id.org/security#nonce",
        previousProof: {
          "@id": "https://w3id.org/security#previousProof",
          "@type": "@id",
        },
        proofPurpose: {
          "@id": "https://w3id.org/security#proofPurpose",
          "@type": "@vocab",
          "@context": {
            "@protected": true,

            id: "@id",
            type: "@type",

            assertionMethod: {
              "@id": "https://w3id.org/security#assertionMethod",
              "@type": "@id",
              "@container": "@set",
            },
            authentication: {
              "@id": "https://w3id.org/security#authenticationMethod",
              "@type": "@id",
              "@container": "@set",
            },
            capabilityDelegation: {
              "@id": "https://w3id.org/security#capabilityDelegationMethod",
              "@type": "@id",
              "@container": "@set",
            },
            capabilityInvocation: {
              "@id": "https://w3id.org/security#capabilityInvocationMethod",
              "@type": "@id",
              "@container": "@set",
            },
            keyAgreement: {
              "@id": "https://w3id.org/security#keyAgreementMethod",
              "@type": "@id",
              "@container": "@set",
            },
          },
        },
        proofValue: {
          "@id": "https://w3id.org/security#proofValue",
          "@type": "https://w3id.org/security#multibase",
        },
        verificationMethod: {
          "@id": "https://w3id.org/security#verificationMethod",
          "@type": "@id",
        },
      },
    },

    "...": {
      "@id": "https://www.iana.org/assignments/jwt#...",
    },
    _sd: {
      "@id": "https://www.iana.org/assignments/jwt#_sd",
      "@type": "@json",
    },
    _sd_alg: {
      "@id": "https://www.iana.org/assignments/jwt#_sd_alg",
    },
    aud: {
      "@id": "https://www.iana.org/assignments/jwt#aud",
      "@type": "@id",
    },
    cnf: {
      "@id": "https://www.iana.org/assignments/jwt#cnf",
      "@context": {
        "@protected": true,

        kid: {
          "@id": "https://www.iana.org/assignments/jwt#kid",
          "@type": "@id",
        },
        jwk: {
          "@id": "https://www.iana.org/assignments/jwt#jwk",
          "@type": "@json",
        },
      },
    },
    exp: {
      "@id": "https://www.iana.org/assignments/jwt#exp",
      "@type": "https://www.w3.org/2001/XMLSchema#nonNegativeInteger",
    },
    iat: {
      "@id": "https://www.iana.org/assignments/jwt#iat",
      "@type": "https://www.w3.org/2001/XMLSchema#nonNegativeInteger",
    },
    iss: {
      "@id": "https://www.iana.org/assignments/jose#iss",
      "@type": "@id",
    },
    jku: {
      "@id": "https://www.iana.org/assignments/jose#jku",
      "@type": "@id",
    },
    kid: {
      "@id": "https://www.iana.org/assignments/jose#kid",
      "@type": "@id",
    },
    nbf: {
      "@id": "https://www.iana.org/assignments/jwt#nbf",
      "@type": "https://www.w3.org/2001/XMLSchema#nonNegativeInteger",
    },
    sub: {
      "@id": "https://www.iana.org/assignments/jose#sub",
      "@type": "@id",
    },
    x5u: {
      "@id": "https://www.iana.org/assignments/jose#x5u",
      "@type": "@id",
    },
  },
});

JSONLD_CONTEXTS.set(
  "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
  {
    "@context": {
      "@protected": true,
      id: "@id",
      type: "@type",
      OpenBadgeCredential: {
        "@id":
          "https://purl.imsglobal.org/spec/vc/ob/vocab.html#OpenBadgeCredential",
      },
      Achievement: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#Achievement",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          achievementType: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#achievementType",
          },
          alignment: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#alignment",
            "@container": "@set",
          },
          creator: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#creator",
          },
          creditsAvailable: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#creditsAvailable",
            "@type": "https://www.w3.org/2001/XMLSchema#float",
          },
          criteria: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#Criteria",
            "@type": "@id",
          },
          fieldOfStudy: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#fieldOfStudy",
          },
          humanCode: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#humanCode",
          },
          image: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#image",
            "@type": "@id",
          },
          otherIdentifier: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#otherIdentifier",
            "@container": "@set",
          },
          related: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#related",
            "@container": "@set",
          },
          resultDescription: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#resultDescription",
            "@container": "@set",
          },
          specialization: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#specialization",
          },
          tag: {
            "@id": "https://schema.org/keywords",
            "@container": "@set",
          },
          version: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#version",
          },
          inLanguage: {
            "@id": "https://schema.org/inLanguage",
          },
        },
      },
      AchievementCredential: {
        "@id": "OpenBadgeCredential",
      },
      AchievementSubject: {
        "@id":
          "https://purl.imsglobal.org/spec/vc/ob/vocab.html#AchievementSubject",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          achievement: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#achievement",
          },
          activityEndDate: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#activityEndDate",
            "@type": "https://www.w3.org/2001/XMLSchema#date",
          },
          activityStartDate: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#activityStartDate",
            "@type": "https://www.w3.org/2001/XMLSchema#date",
          },
          creditsEarned: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#creditsEarned",
            "@type": "https://www.w3.org/2001/XMLSchema#float",
          },
          identifier: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#identifier",
            "@container": "@set",
          },
          image: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#image",
            "@type": "@id",
          },
          licenseNumber: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#licenseNumber",
          },
          result: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#result",
            "@container": "@set",
          },
          role: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#role",
          },
          source: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#source",
            "@type": "@id",
          },
          term: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#term",
          },
        },
      },
      Address: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#Address",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          addressCountry: {
            "@id": "https://schema.org/addressCountry",
          },
          addressCountryCode: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#CountryCode",
          },
          addressLocality: {
            "@id": "https://schema.org/addressLocality",
          },
          addressRegion: {
            "@id": "https://schema.org/addressRegion",
          },
          geo: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#GeoCoordinates",
          },
          postOfficeBoxNumber: {
            "@id": "https://schema.org/postOfficeBoxNumber",
          },
          postalCode: {
            "@id": "https://schema.org/postalCode",
          },
          streetAddress: {
            "@id": "https://schema.org/streetAddress",
          },
        },
      },
      Alignment: {
        "@id": "https://schema.org/AlignmentObject",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          targetCode: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#targetCode",
          },
          targetDescription: {
            "@id": "https://schema.org/targetDescription",
          },
          targetFramework: {
            "@id": "https://schema.org/targetFramework",
          },
          targetName: {
            "@id": "https://schema.org/targetName",
          },
          targetType: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#targetType",
          },
          targetUrl: {
            "@id": "https://schema.org/targetUrl",
            "@type": "https://www.w3.org/2001/XMLSchema#anyURI",
          },
        },
      },
      Criteria: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#Criteria",
      },
      EndorsementCredential: {
        "@id":
          "https://purl.imsglobal.org/spec/vc/ob/vocab.html#EndorsementCredential",
      },
      EndorsementSubject: {
        "@id":
          "https://purl.imsglobal.org/spec/vc/ob/vocab.html#EndorsementSubject",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          endorsementComment: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#endorsementComment",
          },
        },
      },
      Evidence: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#Evidence",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          audience: {
            "@id": "https://schema.org/audience",
          },
          genre: {
            "@id": "https://schema.org/genre",
          },
        },
      },
      GeoCoordinates: {
        "@id":
          "https://purl.imsglobal.org/spec/vc/ob/vocab.html#GeoCoordinates",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          latitude: {
            "@id": "https://schema.org/latitude",
          },
          longitude: {
            "@id": "https://schema.org/longitude",
          },
        },
      },
      IdentifierEntry: {
        "@id":
          "https://purl.imsglobal.org/spec/vc/ob/vocab.html#IdentifierEntry",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          identifier: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#identifier",
          },
          identifierType: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#identifierType",
          },
        },
      },
      IdentityObject: {
        "@id":
          "https://purl.imsglobal.org/spec/vc/ob/vocab.html#IdentityObject",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          hashed: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#hashed",
            "@type": "https://www.w3.org/2001/XMLSchema#boolean",
          },
          identityHash: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#identityHash",
          },
          identityType: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#identityType",
          },
          salt: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#salt",
          },
        },
      },
      Image: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#Image",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          caption: {
            "@id": "https://schema.org/caption",
          },
        },
      },
      Profile: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#Profile",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          additionalName: {
            "@id": "https://schema.org/additionalName",
          },
          address: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#address",
            "@type": "@id",
          },
          dateOfBirth: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#dateOfBirth",
            "@type": "https://www.w3.org/2001/XMLSchema#date",
          },
          email: {
            "@id": "https://schema.org/email",
          },
          familyName: {
            "@id": "https://schema.org/familyName",
          },
          familyNamePrefix: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#familyNamePrefix",
          },
          givenName: {
            "@id": "https://schema.org/givenName",
          },
          honorificPrefix: {
            "@id": "https://schema.org/honorificPrefix",
          },
          honorificSuffix: {
            "@id": "https://schema.org/honorificSuffix",
          },
          image: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#image",
            "@type": "@id",
          },
          otherIdentifier: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#otherIdentifier",
            "@container": "@set",
          },
          parentOrg: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#parentOrg",
            "@type": "@id",
          },
          patronymicName: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#patronymicName",
          },
          phone: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#phone",
          },
          official: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#official",
          },
        },
      },
      Related: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#Related",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          version: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#version",
          },
          inLanguage: {
            "@id": "https://schema.org/inLanguage",
          },
        },
      },
      Result: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#Result",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          achievedLevel: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#achievedLevel",
            "@type": "https://www.w3.org/2001/XMLSchema#anyURI",
          },
          resultDescription: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#resultDescription",
            "@type": "https://www.w3.org/2001/XMLSchema#anyURI",
          },
          status: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#status",
          },
          value: {
            "@id": "https://schema.org/value",
          },
        },
      },
      ResultDescription: {
        "@id":
          "https://purl.imsglobal.org/spec/vc/ob/vocab.html#ResultDescription",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          allowedValue: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#allowedValue",
            "@container": "@list",
          },
          requiredLevel: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#requiredLevel",
            "@type": "https://www.w3.org/2001/XMLSchema#anyURI",
          },
          requiredValue: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#requiredValue",
          },
          resultType: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#resultType",
          },
          rubricCriterionLevel: {
            "@id":
              "https://purl.imsglobal.org/spec/vc/ob/vocab.html#rubricCriterionLevel",
            "@container": "@set",
          },
          valueMax: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#valueMax",
          },
          valueMin: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#valueMin",
          },
        },
      },
      RubricCriterionLevel: {
        "@id":
          "https://purl.imsglobal.org/spec/vc/ob/vocab.html#RubricCriterionLevel",
        "@context": {
          "@protected": true,
          id: "@id",
          type: "@type",
          level: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#level",
          },
          points: {
            "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#points",
          },
        },
      },
      alignment: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#alignment",
        "@container": "@set",
      },
      description: {
        "@id": "https://schema.org/description",
      },
      endorsement: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#endorsement",
        "@container": "@set",
      },
      image: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#image",
        "@type": "@id",
      },
      inLanguage: {
        "@id": "https://schema.org/inLanguage",
      },
      name: {
        "@id": "https://schema.org/name",
      },
      narrative: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#narrative",
      },
      url: {
        "@id": "https://schema.org/url",
        "@type": "https://www.w3.org/2001/XMLSchema#anyURI",
      },
      awardedDate: {
        "@id": "https://purl.imsglobal.org/spec/vc/ob/vocab.html#awardedDate",
        "@type": "xsd:dateTime",
      },
    },
  },
);

export { JSONLD_CONTEXTS };
