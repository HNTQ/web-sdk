export const noauthnApiError =
  "Authdog: You must add the authnApi prop to your <AuthdogProvider>";

export const noAuthdogProviderError =
  "Authdog: You must wrap your application in a <AuthdogProvider> component.";

export const noGuaranteedLoadedError = (hookName: string) =>
  `Authdog: You're calling ${hookName} before there's a guarantee the client has been loaded. Call ${hookName} from a child of <SignedIn>, <SignedOut>, or <AuthdogLoaded>, or use the withAuthdog() HOC.`;

export const multipleAuthdogProvidersError =
  "Authdog: You've added multiple <AuthdogProvider> components in your React component tree. Wrap your components in a single <AuthdogProvider>.";
