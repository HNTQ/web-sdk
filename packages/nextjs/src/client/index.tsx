import { AuthdogProvider as ReactAuthdogProvider } from "@authdog/react";
import { useRouter } from "next/router";
import React from "react";

export * from "@authdog/react";

// const NO_FRONTEND_API_ERR =
//   "The NEXT_PUBLIC_AUTHDOG_FRONTEND_API environment variable must be set to use the AuthdogProvider component.";

type NextAuthdogProviderProps = {
  children: React.ReactNode;
  authnApi: string;
} & any; // IsomorphicClerkOptions;

export function AuthdogProvider({
  children,
  ...rest
}: NextAuthdogProviderProps): JSX.Element {
  // Allow for overrides without making the type public
  const { authnApi, __authdog_ssr_state, authServerSideProps, ...restProps } =
    rest;
  const { push } = useRouter();

  // TODO
  // if (authnApi === undefined && !process.env.NEXT_PUBLIC_AUTHDOG_FRONTEND_API) {
  //   throw Error(NO_FRONTEND_API_ERR);
  // }

  ReactAuthdogProvider.displayName = "ReactAuthdogProvider";

  return (
    <ReactAuthdogProvider
      authnApi={authnApi || process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
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
