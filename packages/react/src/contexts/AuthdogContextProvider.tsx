import React from "react";
import {IsomorphicAuthdogContext} from './IsomorphicAuthdogContext'

//   import IsomorphicClerk, { NewIsomorphicClerkParams } from '../isomorphicClerk';
//   import { AuthContext } from './AuthContext';
//   import { ClientContext } from './ClientContext';
//   import { IsomorphicClerkContext } from './IsomorphicClerkContext';
//   import { OrganizationContext } from './OrganizationContext';
//   import { SessionContext } from './SessionContext';
//   import { UserContext } from './UserContext';

type AuthdogContextProvider = {
  // isomorphicClerkOptions: NewIsomorphicClerkParams;
  // initialState: InitialState | undefined;
  children: React.ReactNode;
};

type AuthdogContextProviderState = {
  user: any;
};

export function AuthdogContextProvider({ children }: any): JSX.Element | null {
  // const { isomorphicClerkOptions, initialState, children } = props;
  // const { isomorphicClerk: adog, loaded: clerkLoaded } = useLoadedIsomorphicClerk(isomorphicClerkOptions);

  const loaded = true;

  const adog = {
    user: {
      id: "123",
      firstName: "John",
      lastName: "Doe",
      email: "j@doe.com",
      emailVerified: true,
      phoneNumber: "1234567890",
      phoneNumberVerified: true
    }
  };

  const [state, setState] = React.useState<AuthdogContextProviderState>({
    user: adog.user
  });

  React.useEffect(() => {
    //   return clerk.addListener(e => setState({ ...e }));
  }, []);

  const authdogCtx = React.useMemo(() => ({ value: adog }), [loaded]);
  // const clientCtx = React.useMemo(() => ({ value: state.client }), [state.client]);

  // const { sessionId, session, userId, user, organizationId, organization } = derivedState;
  // const actor = session?.actor || null;
  // const organizationMembership = organization
  //   ? session?.user.organizationMemberships.find(m => m.organization.id === organizationId)
  //   : organization;
  // const orgId = organizationId;
  // const orgRole = organizationMembership ? organizationMembership.role : organizationMembership;
  // const orgSlug = organizationMembership ? organizationMembership.organization.slug : organizationMembership;

  // const authCtx = React.useMemo(
  //   () => ({
  //     value: { sessionId, userId, actor, orgId, orgRole, orgSlug },
  //   }),
  //   [sessionId, userId, actor, orgId, orgRole, orgSlug],
  // );
  // const userCtx = React.useMemo(() => ({ value: user }), [userId, user]);
  // const sessionCtx = React.useMemo(() => ({ value: session }), [sessionId, session]);
  // const organizationCtx = React.useMemo(() => {
  //   return {
  //     value: {
  //       organization: derivedState.organization,
  //       lastOrganizationInvitation: derivedState.lastOrganizationInvitation,
  //       lastOrganizationMember: derivedState.lastOrganizationMember,
  //     },
  //   };
  // }, [
  //   derivedState.organizationId,
  //   derivedState.organization,
  //   derivedState.lastOrganizationInvitation,
  //   derivedState.lastOrganizationMember,
  // ]);

  return (
    <IsomorphicAuthdogContext.Provider value={authdogCtx}>
      {children}
    </IsomorphicAuthdogContext.Provider>
  );
}

// const useLoadedIsomorphicClerk = (options: NewIsomorphicClerkParams) => {
//   const [loaded, setLoaded] = React.useState(false);
//   const isomorphicClerk = React.useMemo(() => IsomorphicClerk.getOrCreateInstance(options), []);

//   React.useEffect(() => {
//     isomorphicClerk.__unstable__updateProps({ appearance: options.options.appearance });
//   }, [options.options.appearance]);

//   React.useEffect(() => {
//     isomorphicClerk.__unstable__updateProps({ options: options.options });
//   }, [options.options.localization]);

//   React.useEffect(() => {
//     isomorphicClerk.addOnLoaded(() => setLoaded(true));
//   }, []);

//   return { isomorphicClerk, loaded };
// };

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
