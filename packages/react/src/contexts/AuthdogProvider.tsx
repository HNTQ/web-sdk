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
  frontendApi?: string;
  initialState?: InitialState;
}

function AuthdogProviderBase({
  initialState,
  children,
  Authdog,
  frontendApi,
  ...options
}: AuthdogProviderProps): JSX.Element {
  return (
    <StructureContext.Provider value={StructureContextStates.noGuarantees}>
      <AuthdogContextProvider
        initialState={initialState}
        IsomorphicAuthdogOptions={{
          frontendApi: frontendApi || "",
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
