// export const noFrontendApiError = 'Clerk: You must add the frontendApi prop to your <ClerkProvider>';

export const noAuthdogProviderError =
  "Authdog: You must wrap your application in a <AuthdogProvider> component.";

export const noGuaranteedLoadedError = (hookName: string) =>
  `Authdog: You're calling ${hookName} before there's a guarantee the client has been loaded. Call ${hookName} from a child of <SignedIn>, <SignedOut>, or <AuthdogLoaded>, or use the withAuthdog() HOC.`;

// export const noGuaranteedUserError = (hookName: string) =>
//   `Clerk: You're calling ${hookName} before there's a guarantee there's an active user. Call ${hookName} from a child of <SignedIn> or use the withUser() HOC.`;

export const multipleAuthdogProvidersError =
  "Authdog: You've added multiple <AuthdogProvider> components in your React component tree. Wrap your components in a single <AuthdogProvider>.";

// export const hocChildrenNotAFunctionError = 'Clerk: Child of WithClerk must be a function.';

// export const multipleChildrenInButtonComponent = (name: string) =>
//   `Clerk: You've passed multiple children components to <${name}/>. You can only pass a single child component or text.`;

// export const MagicLinkErrorCode = {
//   Expired: 'expired',
//   Failed: 'failed',
// };

// type MagicLinkError = {
//   code: 'expired' | 'failed';
// };

// export function isMagicLinkError(err: any): err is MagicLinkError {
//   return !!err && (err.code === MagicLinkErrorCode.Expired || err.code === MagicLinkErrorCode.Failed);
// }

export const invalidStateError =
  "Invalid state. Feel free to submit a bug or reach out to support";
