import { getSigningKey } from "~/lib/get-signing-key";

jest.mock("~/lib/get-signing-key");

describe("tests getSigningKey function", () => {
  it("should return a keypair", () => {
    const keypair = getSigningKey();
    expect(keypair).toBeTruthy();
  });
});
