import { AuthdogProvider as ReactAuthdogProvider } from "@authdog/authdog-react";
// import { IsomorphicClerkOptions } from '@authdog/authdog-react/dist/types';
import { useRouter } from "next/router";
import React from "react";

export * from "@authdog/authdog-react";

const NO_FRONTEND_API_ERR =
  "The NEXT_PUBLIC_AUTHDOG_FRONTEND_API environment variable must be set to use the AuthdogProvider component.";

type NextAuthdogProviderProps = {
  children: React.ReactNode;
  frontendApi: string;
} & any; // IsomorphicClerkOptions;

export function AuthdogProvider({
  children,
  ...rest
}: NextAuthdogProviderProps): JSX.Element {
  // Allow for overrides without making the type public
  const {
    frontendApi,
    __authdog_ssr_state,
    authServerSideProps,
    // clerkJSUrl,
    ...restProps
  } = rest;
  const { push } = useRouter();

  // TODO
  // if (frontendApi === undefined && !process.env.NEXT_PUBLIC_AUTHDOG_FRONTEND_API) {
  //   throw Error(NO_FRONTEND_API_ERR);
  // }

  console.log(frontendApi)

  ReactAuthdogProvider.displayName = "ReactAuthdogProvider";

  return (
    <ReactAuthdogProvider
      frontendApi={frontendApi || process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
      // clerkJSUrl={clerkJSUrl || process.env.NEXT_PUBLIC_CLERK_JS}
      navigate={(to: string) => push(to)}
      // withServerSideAuth automatically injects __clerk_ssr_state
      // getAuth returns a user-facing authServerSideProps that hides __clerk_ssr_state
      initialState={
        authServerSideProps?.__authdog_ssr_state || __authdog_ssr_state
      }
      {...restProps}
    >
      {children}
    </ReactAuthdogProvider>
  );
}
