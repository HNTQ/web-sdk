// import type {Authdog, AuthdogOptions, ClientResource, LoadedAuthdog, UserResource} from '@authdog/types';

// declare global {
//   interface Window {
//     __authdog_frontend_api?: string;
//   }
// }

// export interface IsomorphicAuthdogOptions extends AuthdogOptions {
//   Authdog?: AuthdogProp;
//   authdogJSUrl?: string;
//   authdogJSVariant?: 'headless' | '';
// }

// export interface BrowserAuthdogConstructor {
//   new (frontendApi: string): BrowserAuthdog;
// }

// export interface HeadlessBrowserAuthdogConstrutor {
//   new (frontendApi: string): HeadlessBrowserAuthdog;
// }

// export type WithAuthdogProp<T> = T & { authdog: LoadedAuthdog };

// export type WithUserProp<T> = T & { user: UserResource };

// // Clerk object
// export interface MountProps {
//   mount: (node: HTMLDivElement, props: any) => void;
//   unmount: (node: HTMLDivElement) => void;
//   updateProps: (props: any) => void;
//   props?: any;
// }

// export interface HeadlessBrowserAuthdog extends Authdog {
//   load: (opts?: AuthdogOptions) => Promise<void>;
//   updateClient: (client: ClientResource) => void;
// }

// export interface BrowserAuthdog extends HeadlessBrowserAuthdog {
//   onComponentsReady: Promise<void>;
//   components: any;
// }

// export type AuthdogProp =
//   | BrowserAuthdogConstructor
//   | BrowserAuthdog
//   | HeadlessBrowserAuthdog
//   | HeadlessBrowserAuthdogConstrutor
//   | undefined
//   | null;

// // type ButtonProps = {
// //   afterSignInUrl?: string;
// //   afterSignUpUrl?: string;
// //   redirectUrl?: string;
// //   mode?: 'redirect' | 'modal';
// //   children?: React.ReactNode;
// // };

// // export type SignInButtonProps = ButtonProps;
// // export type SignUpButtonProps = ButtonProps;

// // export type SignInWithMetamaskButtonProps = Pick<ButtonProps, 'redirectUrl' | 'children'>;

// // export type RedirectToProps = RedirectOptions;
