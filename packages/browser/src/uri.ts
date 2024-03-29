/**
 * This method extracts a parameter value from a uri.
 * For example: https://authdog.dev?param=value will return "value" for param "param".
 *
 * @remarks
 * This method is part of the \@authdog/browser.
 *
 * @param uri raw uri to be parsed
 * @param param parameter to be extracted from uri
 * @returns parameter value
 */
export const getParamFromUri = (uri: string, param: string) => {
  param = param.replace(/[\\[\]]/g, "\\$&");
  // eslint-disable-next-line no-var
  var regex = new RegExp("[?&]" + param + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(uri);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

// remove parameter from current location uri
export const removeParamFromUri = (param: string) => {
  const uri = window.location.href;
  const url = new URL(uri);
  url.searchParams.delete(param);
  window.history.replaceState({}, document.title, url.toString());
};
