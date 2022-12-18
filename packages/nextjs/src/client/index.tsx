export {};
// import { ClerkProvider as ReactClerkProvider } from '@authdog/authdog-react';
// // import { IsomorphicClerkOptions } from '@clerk/clerk-react/dist/types';
// import { useRouter } from 'next/router';
// import React from 'react';
// import { IsomorphicAuthdogOptions } from '../../../react/src/types';

// // export * from '@clerk/clerk-react';

// const NO_FRONTEND_API_ERR =
//   'The NEXT_PUBLIC_AUTHDOG_FRONTEND_API environment variable must be set to use the AuthdogProvider component.';

// type NextClerkProviderProps = {
//   children: React.ReactNode;
//   frontendApi?: string;
// } & IsomorphicAuthdogOptions;

// export function ClerkProvider({ children, ...rest }: NextAuthdogProviderProps): JSX.Element {
//   // Allow for overrides without making the type public
//   const { frontendApi, __authdog_ssr_state, authServerSideProps, authdogJSUrl, ...restProps } = rest;
//   const { push } = useRouter();

//   if (frontendApi == undefined && !process.env.NEXT_PUBLIC_CLERK_FRONTEND_API) {
//     throw Error(NO_FRONTEND_API_ERR);
//   }

//   ReactClerkProvider.displayName = 'ReactAuthdogProvider';

//   return (
//     <ReactAuthdogProvider
//       frontendApi={frontendApi || process.env.NEXT_PUBLIC_AUTHDOG_FRONTEND_API}
//       clerkJSUrl={authdogJSUrl || process.env.NEXT_PUBLIC_AUTHDOG_JS}
//       navigate={to => push(to)}
//       // withServerSideAuth automatically injects __clerk_ssr_state
//       // getAuth returns a user-facing authServerSideProps that hides __clerk_ssr_state
//       initialState={authServerSideProps?.__clerk_ssr_state || __clerk_ssr_state}
//       {...restProps}
//     >
//       {children}
//     </ReactClerkProvider>
//   );
// }
