import { addCredentialStatus } from "~/server/api/network-functions/add-credential-status";
import {
  achievementCredential,
  achievementCredentialProd,
} from "shared/examples/sample-credentials/achievementCredential";
import {
  achievementCredentialWithStatus,
  achievementCredentialWithStatusProd,
} from "shared/examples/sample-credentials/achievementCredentialWithStatus";

jest.mock("~/server/api/network-functions/add-credential-status");

describe("tests DCC status service to allocate a credential with a credentialStatus object", () => {
  const mockArgument = achievementCredential;
  const mockResponse = achievementCredentialWithStatus;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return a mock credentialStatus object", async () => {
    const result = await addCredentialStatus(mockArgument);
    expect(result).toBe(mockResponse);
  }),
    it("should fail with an error", async () => {
      try {
        await addCredentialStatus(mockArgument);
      } catch (error) {
        expect(error).toMatch("error");
      }
    });
});
