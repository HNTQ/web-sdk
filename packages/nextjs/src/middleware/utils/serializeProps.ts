import type { GetServerSidePropsResult } from "next";

// import type { AuthData } from '../types';

type AuthData = any;

/**
 *
 * Next.js
 *
 * @export
 * @param callbackResult The results from the wrapped (user-provided) getServerSideProps callback.
 * @param authData
 */
export function injectSSRStateIntoProps(
  callbackResult: any,
  authData: AuthData
): GetServerSidePropsResult<any> {
  return {
    ...callbackResult,
    props: injectSSRStateIntoObject(callbackResult.props, authData)
  };
}

export const injectSSRStateIntoObject = (obj: any, authData: AuthData) => {
  // Serializing the state on dev env is a temp workaround for the following issue:
  // https://github.com/vercel/next.js/discussions/11209|Next.js
  const __authdog_ssr_state =
    process.env.NODE_ENV !== "production"
      ? JSON.parse(JSON.stringify({ ...authData }))
      : { ...authData };
  return { ...obj, __authdog_ssr_state };
};
