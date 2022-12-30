import * as t from "./types";
import * as q from "./queries";

import { gqlFetcher } from "./graphql";

/**
 * Fetch current user information
 *
 * @remarks
 * This method is part of the \@authdog/browser-sdk.
 *
 * @param environmentId - unique identifier for the application environment
 * @param originId - application host origin
 * @param Authorization - session token
 * @param platformUri - Authdog Identity endpoint
 */
export const fetchUserInfos = async ({
  environmentId,
  originId,
  Authorization,
  platformUri
}: t.IFetchUser) => {
  if (!Authorization) {
    console.error("Can't fetch user infos without Authorization");
    return null;
  }

  return await gqlFetcher(
    { endpoint: `${platformUri}/graphql`, query: q.APP_ENV_USER },
    {
      Authorization: `Bearer ${Authorization}`,
      environmentId,
      originId
    }
  )
    .then(async (res: any) => {
      return await res.json();
    })
    .catch((err) => {
      throw new Error(err);
    })
    .then((json) => json?.data?.applicationEnvironmentUser?.user);
};
