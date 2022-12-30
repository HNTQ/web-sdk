import * as c from "./constants";
import * as t from "./types";
import { deleteSessionFromCookies } from "./cookies";

/**
 * Get parameter from session storage by id
 *
 * @remarks
 * This method is part of the \@authdog/web-sdk.
 *
 * @param id - session storage key id
 */
export const getParamFromSessionStorage = (id: string) => {
  return sessionStorage.getItem(id);
};

/**
 * Clear user session.
 *
 * @remarks
 * This method is part of the \@authdog/web-sdk.
 *
 * @param domain - cookie domain used for session (e.g.: .acme.org)
 *
 */
export const clearSession = (domain?: string) => {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(c.SDK_SESSION_ID);
    window.sessionStorage.removeItem(c.SDK_ENV_ID);
    if (domain) {
      deleteSessionFromCookies(domain);
    }
  }
};

/**
 * Logout current user.
 *
 * @remarks
 * This method is part of the \@authdog/web-sdk.
 *
 * @param domain - cookie domain used for session (e.g.: .acme.org)
 *
 */
export const logout = async ({ domain }: t.ILogoutUser) => {
  void clearSession(domain);
  // return await httpClient(`${tenantUri}/api/v1/oauth2/logout`,
  location.reload(); // TODO get logout uri
};
