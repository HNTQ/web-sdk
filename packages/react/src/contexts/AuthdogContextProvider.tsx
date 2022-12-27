import React from "react";
import { IsomorphicAuthdog } from "../IsomorphicAuthdog";
import { AuthContext } from "./AuthContext";
import { IsomorphicAuthdogContext } from "./IsomorphicAuthdogContext";

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
};

export function AuthdogContextProvider(props: {
  children: React.ReactNode;
  isomorphicAuthdogOptions: any;
  initialState?: any;
}): JSX.Element | null {
  const { isomorphicAuthdogOptions, initialState, children } = props; 
  const { isomorphicAuthdog: authdog, loaded: authdogLoaded } =
    useLoadedIsomorphicAuthdog(isomorphicAuthdogOptions);

  console.log("AuthdogContextProvider", authdogLoaded, authdog)


  const [state, setState] = React.useState<AuthdogContextProviderState>({
    // client: clerk.client as ClientResource,
    // session: clerk.session,
    // @ts-ignore
    user: authdog.user
    // organization: clerk.organization,
    // lastOrganizationInvitation: null,
    // lastOrganizationMember: null,
  });

  React.useEffect(() => {
    return authdog.addListener((e) => setState({ ...e }));
  }, []);

  console.log("context provider", authdog)


  const authdogCtx = React.useMemo(() => ({ value: authdog }), [authdogLoaded]);
  const authCtx = React.useMemo(
    () => ({ value: { user: state.user } }),
    [state.user]
  );

  return (
    <IsomorphicAuthdogContext.Provider value={authdogCtx}>
      <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
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
