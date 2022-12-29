import { ClientResource } from "@authdog/types";
import React from "react";
import { IsomorphicAuthdog } from "../isomorphic";
import { AuthContext } from "./AuthContext";

import { IsomorphicAuthdogContext } from "./IsomorphicAuthdogContext";


import { ClientContext } from './ClientContext';
import { SessionContext } from './SessionContext';
import { UserContext } from './UserContext';

// import { SessionContext } from "./SessionContext";

//   import IsomorphicClerk, { NewIsomorphicClerkParams } from '../isomorphicClerk';
//   import { AuthContext } from './AuthContext';
//   import { ClientContext } from './ClientContext';
//   import { IsomorphicClerkContext } from './IsomorphicClerkContext';
//   import { OrganizationContext } from './OrganizationContext';
//   import { SessionContext } from './SessionContext';
//   import { UserContext } from './UserContext';

type AuthdogContextProvider = {
  children: React.ReactNode;
};

type AuthdogContextProviderState = {
  user: any | null;
  session: any | null;
  client: ClientResource;
};

export function AuthdogContextProvider(props: {
  children: React.ReactNode;
  isomorphicAuthdogOptions: any;
  initialState?: any;
}): JSX.Element | null {
  const { isomorphicAuthdogOptions, initialState, children } = props;
  const { isomorphicAuthdog: authdog, loaded: authdogLoaded } =
    useLoadedIsomorphicAuthdog(isomorphicAuthdogOptions);

  const [state, setState] = React.useState<AuthdogContextProviderState>({
    client: authdog.client as ClientResource,
    session: authdog.session,
    user: authdog.user,
    // organization: clerk.organization,
    // lastOrganizationInvitation: null,
    // lastOrganizationMember: null,
  });

  React.useEffect(() => {
    return authdog.addListener((e) => setState({ ...e }));
  }, []);

  const authdogCtx = React.useMemo(() => ({ value: authdog }), [authdogLoaded]);
  const authCtx = React.useMemo(
    () => ({ value: { user: state.user } }),
    [state.user]
  );

  const clientCtx = React.useMemo(() => ({ value: state.client }), [state.client]);
  const derivedState = deriveState(authdogLoaded, state, initialState);

  const userCtx = React.useMemo(() => {
    return { value: derivedState.user };
  }, [derivedState.userId, derivedState.user]);

  const sessionCtx = React.useMemo(() => {
    return { value: derivedState.session };
  }, [derivedState.sessionId, derivedState.session]);

  return (
    // @ts-expect-error : TODO fix type authdogCtx
    <IsomorphicAuthdogContext.Provider value={authdogCtx}>
      <ClientContext.Provider value={clientCtx}>
        <SessionContext.Provider value={sessionCtx}>
          <AuthContext.Provider value={authCtx}>
            <UserContext.Provider value={userCtx}>{children}</UserContext.Provider>
          </AuthContext.Provider>
        </SessionContext.Provider>
      </ClientContext.Provider>


    </IsomorphicAuthdogContext.Provider>
  );
}

const useLoadedIsomorphicAuthdog = (
  options: any
  //NewIsomorphicAuthdogParams
) => {
  const [loaded, setLoaded] = React.useState(false);
  const isomorphicAuthdog = React.useMemo(
    () => IsomorphicAuthdog.getOrCreateInstance(options),
    []
  );

  // React.useEffect(() => {
  //   isomorphicAuthdog.__unstable__updateProps({ appearance: options.options.appearance });
  // }, [options.options.appearance]);

  // React.useEffect(() => {
  //   isomorphicAuthdog.__unstable__updateProps({ options: options.options });
  // }, [options.options.localization]);

  React.useEffect(() => {
    isomorphicAuthdog.addOnLoaded(() => setLoaded(true));
  }, []);

  return { isomorphicAuthdog, loaded };
};

const deriveState = (_loaded: boolean, _state: any, _initialState: any) => {
  // if (!authdogLoaded) {
  //   return initialState;
  // }

  return { sessionId: "03ea0a25-fa9d-45e3-9b7e-9e099d252e6e", session: {
    id: "f9fafc7a-d131-49bb-9e82-73764792c37d",
  }, userId: "f9fafc7a-d131-49bb-9e82-73764792c37d", user: {
    id: "310bfb80-464b-4356-b742-b4d9fa959c19",
    pathRoot: "",
    reload: null,
  }};
};
