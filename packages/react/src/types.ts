import { AuthdogInstance } from "@authdog/types";

declare global {
  interface Window {
    __authdog_authn_api?: string;
  }
}

export interface HeadlessBrowserAuthdog extends AuthdogInstance {
  load: (opts?: any) => Promise<void>;
  updateClient: (client: any) => void;
}

export interface BrowserAuthdog extends HeadlessBrowserAuthdog {
  onComponentsReady: Promise<void>;
  components: any;
}

export interface IsomorphicAuthdogOptions extends AuthdogOptions {
  Authdog?: AuthdogProp;
}

export interface BrowserAuthdogConstructor {
  new (authnApi: string): BrowserAuthdog;
}

export interface HeadlessBrowserAuthdogConstrutor {
  new (authnApi: string): HeadlessBrowserAuthdog;
}

// export type WithAuthdogProp<T> = T & { authdog: LoadedAuthdog };

// export type WithUserProp<T> = T & { user: UserResource };

// // Clerk object
// export interface MountProps {
//   mount: (node: HTMLDivElement, props: any) => void;
//   unmount: (node: HTMLDivElement) => void;
//   updateProps: (props: any) => void;
//   props?: any;
// }

// TODO: use types from @authdog/types
type AuthdogOptions = any;
type ClientResource = any;

export interface HeadlessBrowserAuthdog extends AuthdogInstance {
  // load: (opts?: AuthdogOptions) => Promise<void>;
  // updateClient: (client: ClientResource) => void;
}

export interface BrowserAuthdog extends HeadlessBrowserAuthdog {
  // onComponentsReady: Promise<void>;
  // components: any;
}

export type AuthdogProp =
  | BrowserAuthdog
  | BrowserAuthdogConstructor
  | HeadlessBrowserAuthdog
  | HeadlessBrowserAuthdogConstrutor
  | undefined
  | null;
