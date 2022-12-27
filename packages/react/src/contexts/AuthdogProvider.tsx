// import { InitialState } from '@clerk/types';
import React from "react";

import { multipleAuthdogProvidersError } from "../errors";
import type { IsomorphicAuthdogOptions } from "../types";
import { withMaxAllowedInstancesGuard } from "../utils";
import { AuthdogContextProvider } from "./AuthdogContextProvider";
import { StructureContext, StructureContextStates } from "./StructureContext";

type InitialState = any;

export interface AuthdogProviderProps extends IsomorphicAuthdogOptions {
  children: React.ReactNode;
  authnApi?: string;
  initialState?: InitialState;
}

function AuthdogProviderBase({
  initialState,
  children,
  Authdog,
  authnApi,
  ...options
}: AuthdogProviderProps): JSX.Element {
  return (
    <StructureContext.Provider value={StructureContextStates.noGuarantees}>
      <AuthdogContextProvider
        initialState={initialState}
        isomorphicAuthdogOptions={{
          authnApi: authnApi || "",
          Authdog,
          options
        }}
      >
        {children}
      </AuthdogContextProvider>
    </StructureContext.Provider>
  );
}

const AuthdogProvider = withMaxAllowedInstancesGuard(
  AuthdogProviderBase,
  "AuthdogProvider",
  multipleAuthdogProvidersError
);

AuthdogProvider.displayName = "AuthdogProvider";

export { AuthdogProvider };
