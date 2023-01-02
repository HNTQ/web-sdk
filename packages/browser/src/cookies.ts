import * as c from "./constants";

/**
 * Returns session cookie by name if it exists in the cookies store
 *
 * @remarks
 * This method is part of the \@authdog/browser.
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
 * This method is part of the \@authdog/browser.
 *
 * @param domain - cookie domain used for session (e.g.: .acme.org)
 *
 */
export const deleteSessionFromCookies = (domain: string) => {
  var d = new Date();
  d.setTime(d.getTime());
  var sessionIdBlock = `${c.SDK_SESSION_ID}=`;
  var domainBlock = `domain=${domain}`;
  var pathBlock = "path=/";
  var expiresBlock = "expires=" + d.toUTCString();
  document.cookie = [sessionIdBlock, domainBlock, pathBlock, expiresBlock].join(
    ";"
  );
};
