import { IsomorphicAuthdog } from "./isomorphic";

describe("isomorphicAuthdog test suite", () => {
  test("isomorphicAuthdog constructor", async () => {
    const isoAdogClient = new IsomorphicAuthdog({
      authnApi: "http://localhost:3000",
      signinUri: "http://localhost:3000/signin?id=123",
    });
    expect(isoAdogClient.thisMode).toBe("server");
  });
});
