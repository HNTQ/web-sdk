import { IsomorphicAuthdog } from "./IsomorphicAuthdog";

describe("isomorphicAuthdog test suite", () => {
  test("isomorphicAuthdog constructor", async () => {
    const isoAdogClient = new IsomorphicAuthdog({
      Authdog: null,
      frontendApi: "http://localhost:3000",
      options: {}
    });
    expect(isoAdogClient.thisMode).toBe("server");
  });
});
