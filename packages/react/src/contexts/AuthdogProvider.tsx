import React from "react";

import { multipleAuthdogProvidersError } from "../errors";
import type { IsomorphicAuthdogOptions } from "../types";
import { withMaxAllowedInstancesGuard } from "../utils";
import { AuthdogContextProvider } from "./AuthdogContextProvider";

type InitialState = any;

export interface AuthdogProviderProps extends IsomorphicAuthdogOptions {
  children: React.ReactNode;
  authnApi: string;
  webLoginUri: string;
  initialState?: InitialState;
}

export interface AuthdogIsomorphicOptions extends IsomorphicAuthdogOptions {
  authnApi: string;
  webLoginUri: string;
}

function AuthdogProviderBase({
  initialState,
  children,
  authnApi,
  webLoginUri
}: AuthdogProviderProps): JSX.Element {
  return (
    <AuthdogContextProvider
      initialState={initialState}
      isomorphicAuthdogOptions={{
        authnApi,
        webLoginUri
      }}
    >
      {children}
    </AuthdogContextProvider>
  );
}

const AuthdogProvider = withMaxAllowedInstancesGuard(
  AuthdogProviderBase,
  "AuthdogProvider",
  multipleAuthdogProvidersError
);

AuthdogProvider.displayName = "AuthdogProvider";

export { AuthdogProvider };
