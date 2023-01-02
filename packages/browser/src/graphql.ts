import * as c from "./constants";

/**
 * GraphQL standalone query client
 *
 * @remarks
 * This method is part of the \@authdog/browser-sdk.
 *
 * @param endpoint - graphql endpoint
 * @param query - graphql query
 * @param Authorization - session token
 * @param originId - application host origin
 * @param environmentId - unique identifier for the application environment
 *
 */
export const gqlFetcher = async (
  { endpoint, query }: any,
  { Authorization, ["originId"]: origin, environmentId }: any
) => {
  return await fetch(endpoint, {
    method: c.GRAPHQL_METHOD,
    headers: {
      "Content-Type": c.GRAPHQL_CONTENT_TYPE,
      Authorization
    },
    body: JSON.stringify({
      query,
      variables: {
        meta: {
          environmentId,
          origin
        }
      }
    })
  });
};
