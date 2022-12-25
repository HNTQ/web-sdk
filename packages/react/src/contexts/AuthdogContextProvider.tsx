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

export function AuthdogContextProvider(props: any): JSX.Element | null {
  const { isomorphicAuthdogOptions, initialState, children } = props;

  const { isomorphicAuthdog: authdog, loaded: authdogLoaded } =
    useLoadedIsomorphicAuthdog(isomorphicAuthdogOptions);

  const [state, setState] = React.useState<AuthdogContextProviderState>({
    user: null
  });

  React.useEffect(() => {
    //   return clerk.addListener(e => setState({ ...e }));
  }, []);

  const authdogCtx = React.useMemo(() => ({ value: authdog }), [authdogLoaded]);

  const user = {
    id: "123"
  };

  const authCtx = React.useMemo(
    () => ({
      value: { user }
    }),
    []
  );

  return (
    <IsomorphicAuthdogContext.Provider value={authdogCtx}>
      <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
    </IsomorphicAuthdogContext.Provider>
  );
}

const useLoadedIsomorphicAuthdog = (
  options: any
  //NewIsomorphicClerkParams
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

// // This should be provided from isomorphicClerk
// // TODO: move inside isomorphicClerk
// function deriveState(
//   clerkLoaded: boolean,
//   state: ClerkContextProviderState,
//   initialState: InitialState | undefined,
// ): {
//   userId: string | null | undefined;
//   sessionId: string | null | undefined;
//   organizationId: string | null | undefined;
//   session: ActiveSessionResource | null | undefined;
//   user: UserResource | null | undefined;
//   organization: OrganizationResource | null | undefined;
//   lastOrganizationInvitation: OrganizationInvitationResource | null | undefined;
//   lastOrganizationMember: OrganizationMembershipResource | null | undefined;
// } {
//   if (!clerkLoaded && initialState) {

//   }

// }
