import * as c from "./constants";
import * as t from "./types";
import * as q from "./queries";

import { getParamFromUri, removeParamFromUri } from "./uri";
import { getSessionCookie } from "./cookies";
import { getParamFromSessionStorage } from "./session";
import { gqlFetcher } from "./graphql";

/**
 * Initialize application session
 *
 * @remarks
 * This method is part of the \@authdog/web-sdk.
 *
 * @param environmentId - unique identifier for the application environment
 * @param originId - application host origin
 * @returns session credentials
 */
export const getSessionCredentials = ({
  environmentId,
  origin = location.host || location.hostname
}: t.IInitSessionParameters) => {
  const sessionFromUri = getParamFromUri(location.search, c.TOKEN_URI_PARAM);
  const sessionFromSessionStorage = getParamFromSessionStorage(
    c.SDK_SESSION_ID
  );
  const sessionFromCookies = getSessionCookie(c.SDK_SESSION_ID);

  const session =
    sessionFromCookies || sessionFromUri || sessionFromSessionStorage;
  if (typeof window !== "undefined") {
    if (sessionFromCookies) {
      window.sessionStorage.setItem(c.SDK_SESSION_ID, sessionFromCookies);
    } else if (sessionFromUri) {
      persistTokenFromUri();
    }
    if (environmentId) {
      window.sessionStorage.setItem(c.SDK_ENV_ID, environmentId);
    }
    if (!session && environmentId) {
      console.info("Authdog: no session found, you are not logged in.");
    }
  }
  const credentials = {
    Authorization: session,
    environmentId,
    origin
  };
  return credentials;
};

/**
 * Fetch current user information
 *
 * @remarks
 * This method is part of the \@authdog/web-sdk.
 *
 * @param environmentId - unique identifier for the application environment
 * @param originId - application host origin
 * @param Authorization - session token
 * @param authnUri - Authdog Identity endpoint
 */
export const fetchUserInfos = async ({
  environmentId,
  originId,
  Authorization,
  authnUri
}: t.IFetchUser) => {
  if (!Authorization) {
    console.error("Can't fetch user infos without Authorization");
    return null;
  }

  return await gqlFetcher(
    { endpoint: `${authnUri}/graphql`, query: q.APP_ENV_USER },
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

export const persistTokenFromUri = () => {
  const sessionFromUri = getParamFromUri(location.search, c.TOKEN_URI_PARAM);
  if (sessionFromUri) {
    window.sessionStorage.setItem(c.SDK_SESSION_ID, sessionFromUri);
    removeParamFromUri(c.TOKEN_URI_PARAM);
  }
};

export const getSessionTokenFromStorage = () =>
  getParamFromSessionStorage(c.SDK_SESSION_ID);
