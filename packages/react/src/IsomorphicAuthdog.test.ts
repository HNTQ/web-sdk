import { IsomorphicAuthdog } from "./IsomorphicAuthdog";

describe("isomorphicAuthdog test suite", () => {
  test("isomorphicAuthdog constructor", async () => {
    const isoAdogClient = new IsomorphicAuthdog();
    expect(isoAdogClient.isClient).toBeFalsy();
  });
});
