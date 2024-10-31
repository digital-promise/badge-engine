import { type Model, Schema, model } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProfile {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProfileMethods {}

// Create a new Model type that knows about methods
type ProfileModel = Model<IProfile, object, IProfileMethods>;

const profileSchema = new Schema<IProfile, ProfileModel, IProfileMethods>({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  properties: {
    id: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    type: {
      type: {
        type: String,
      },
      minItems: {
        type: Number,
      },
      contains: {
        enum: {
          type: [String],
        },
      },
      items: {
        description: {
          type: String,
        },
        comment: {
          type: String,
        },
        type: {
          type: String,
        },
      },
    },
    name: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    url: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    phone: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    description: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    endorsement: {
      type: {
        type: String,
      },
      items: {
        ref: {
          type: String,
        },
      },
    },
    endorsementJwt: {
      type: {
        type: String,
      },
      items: {
        description: {
          type: String,
        },
        comment: {
          type: String,
        },
        type: {
          type: String,
        },
        pattern: {
          type: String,
        },
      },
    },
    image: {
      ref: {
        type: String,
      },
    },
    email: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    address: {
      ref: {
        type: String,
      },
    },
    otherIdentifier: {
      type: {
        type: String,
      },
      items: {
        ref: {
          type: String,
        },
      },
    },
    official: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    parentOrg: {
      ref: {
        type: String,
      },
    },
    familyName: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    givenName: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    additionalName: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    patronymicName: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    honorificPrefix: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    honorificSuffix: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    familyNamePrefix: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    dateOfBirth: {
      description: {
        type: String,
      },
      comment: {
        type: String,
      },
      type: {
        type: String,
      },
      format: {
        type: String,
      },
    },
  },
  required: {
    type: [String],
  },
  additionalProperties: {
    type: Boolean,
  },
  defs: {
    EndorsementCredential: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        "@context": {
          type: {
            type: String,
          },
          minItems: {
            type: Number,
          },
          //   items: {
          //     type: [Mixed],
          //   },
          additionalItems: {
            ref: {
              type: String,
            },
          },
        },
        // type: {
        //   allOf: {
        //     type: [Mixed],
        //   },
        // },
        id: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        name: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        description: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        credentialSubject: {
          ref: {
            type: String,
          },
        },
        awardedDate: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
          format: {
            type: String,
          },
        },
        issuer: {
          ref: {
            type: String,
          },
        },
        validFrom: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
          format: {
            type: String,
          },
        },
        validUntil: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
          format: {
            type: String,
          },
        },
        proof: {
          type: {
            type: String,
          },
          items: {
            ref: {
              type: String,
            },
          },
        },
        credentialSchema: {
          type: {
            type: String,
          },
          items: {
            ref: {
              type: String,
            },
          },
        },
        credentialStatus: {
          ref: {
            type: String,
          },
        },
        refreshService: {
          ref: {
            type: String,
          },
        },
        termsOfUse: {
          type: {
            type: String,
          },
          items: {
            ref: {
              type: String,
            },
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    CredentialStatus: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        id: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        type: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    IdentifierEntry: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        type: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
          enum: {
            type: [String],
          },
        },
        identifier: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        identifierType: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          //   oneOf: {
          //     type: [Mixed],
          //   },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    Proof: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        type: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        created: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
          format: {
            type: String,
          },
        },
        cryptosuite: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        challenge: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        domain: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        nonce: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        proofPurpose: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        proofValue: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        verificationMethod: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    RefreshService: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        id: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        type: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    Image: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        id: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        type: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
          enum: {
            type: [String],
          },
        },
        caption: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    EndorsementSubject: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        id: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        type: {
          type: {
            type: String,
          },
          minItems: {
            type: Number,
          },
          contains: {
            enum: {
              type: [String],
            },
          },
          items: {
            description: {
              type: String,
            },
            comment: {
              type: String,
            },
            type: {
              type: String,
            },
          },
        },
        endorsementComment: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    Context: {
      description: {
        type: String,
      },
      //   oneOf: {
      //     type: [Mixed],
      //   },
    },
    TermsOfUse: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        id: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        type: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    ProfileRef: {
      description: {
        type: String,
      },
      //   oneOf: {
      //     type: [Mixed],
      //   },
    },
    Address: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        type: {
          type: {
            type: String,
          },
          minItems: {
            type: Number,
          },
          contains: {
            enum: {
              type: [String],
            },
          },
          items: {
            description: {
              type: String,
            },
            comment: {
              type: String,
            },
            type: {
              type: String,
            },
          },
        },
        addressCountry: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        addressCountryCode: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        addressRegion: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        addressLocality: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        streetAddress: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        postOfficeBoxNumber: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        postalCode: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        geo: {
          ref: {
            type: String,
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    GeoCoordinates: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        type: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
          enum: {
            type: [String],
          },
        },
        latitude: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        longitude: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    Profile: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        id: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        type: {
          type: {
            type: String,
          },
          minItems: {
            type: Number,
          },
          contains: {
            enum: {
              type: [String],
            },
          },
          items: {
            description: {
              type: String,
            },
            comment: {
              type: String,
            },
            type: {
              type: String,
            },
          },
        },
        name: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        url: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        phone: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        description: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        endorsement: {
          type: {
            type: String,
          },
          items: {
            ref: {
              type: String,
            },
          },
        },
        endorsementJwt: {
          type: {
            type: String,
          },
          items: {
            description: {
              type: String,
            },
            comment: {
              type: String,
            },
            type: {
              type: String,
            },
            pattern: {
              type: String,
            },
          },
        },
        image: {
          ref: {
            type: String,
          },
        },
        email: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        address: {
          ref: {
            type: String,
          },
        },
        otherIdentifier: {
          type: {
            type: String,
          },
          items: {
            ref: {
              type: String,
            },
          },
        },
        official: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        parentOrg: {
          ref: {
            type: String,
          },
        },
        familyName: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        givenName: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        additionalName: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        patronymicName: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        honorificPrefix: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        honorificSuffix: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        familyNamePrefix: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        dateOfBirth: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
          format: {
            type: String,
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
    CredentialSchema: {
      description: {
        type: String,
      },
      type: {
        type: String,
      },
      properties: {
        id: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
        type: {
          description: {
            type: String,
          },
          comment: {
            type: String,
          },
          type: {
            type: String,
          },
        },
      },
      required: {
        type: [String],
      },
      additionalProperties: {
        type: Boolean,
      },
    },
  },
});
