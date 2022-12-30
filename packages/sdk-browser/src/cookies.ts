import * as c from "./constants";

/**
 * Returns session cookie by name if it exists in the cookies store
 *
 * @remarks
 * This method is part of the \@authdog/sdk-browser.
 *
 * @param name - cookie identifier in the cookie store
 *
 */
export const getSessionCookie = (name: string) => {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
};

/**
 * Reset cookie store for the domain
 *
 * @remarks
 * This method is part of the \@authdog/sdk-browser.
 *
 * @param domain - cookie domain used for session (e.g.: .acme.org)
 *
 */
export const deleteSessionFromCookies = (domain: string) => {
  var d = new Date();
  d.setTime(d.getTime());
  var expires = "expires=" + d.toUTCString();
  document.cookie =
    c.SESSION_ID + "=" + "" + `;domain=${domain};path=/;` + expires;
};
