import {IsomorphicAuthdog} from './isomorphicAuthdog'

describe("isomorphicAuthdog test suite", () => {
    test("isomorphicAuthdog constructor", async () => {
      const isoAdogClient = new IsomorphicAuthdog();
      expect(isoAdogClient.isClient).toBeFalsy();
    });

});