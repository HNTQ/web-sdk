import {
  AuthdogProp,
  BrowserAuthdog,
  BrowserAuthdogConstructor,
  HeadlessBrowserAuthdog,
  HeadlessBrowserAuthdogConstrutor,
  IsomorphicAuthdogOptions
} from "./types";
import { inClientSide, isConstructor } from "./utils";
import { noauthnApiError } from "./errors";
import { ClientResource } from "@authdog/types";

export type NewIsomorphicAuthdogParams = {
  authnApi: string;
  options: IsomorphicAuthdogOptions;
  AuthdogClient: AuthdogProp | null;
};

type MethodName<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];
type MethodCallback = () => void;

export class IsomorphicAuthdog {
  private mode: "browser" | "server";
  private authnApi: string;
  private options: IsomorphicAuthdogOptions;
  private AuthdogClient: AuthdogProp;
  private authdogJs: BrowserAuthdog | HeadlessBrowserAuthdog | null = null;
  private premountMethodCalls = new Map<
    MethodName<BrowserAuthdog>,
    MethodCallback
  >();

  static #instance: IsomorphicAuthdog;

  #loaded = false;
  session: any;
  user: any;

  get loaded(): boolean {
    return this.#loaded;
  }

  static getOrCreateInstance(params: NewIsomorphicAuthdogParams) {
    // During SSR: a new instance should be created for every request
    // During CSR: use the cached instance for the whole lifetime of the app
    // This method should be idempotent in both scenarios
    if (!inClientSide() || !this.#instance) {
      this.#instance = new IsomorphicAuthdog(params);
    }
    return this.#instance;
  }

  constructor(params: NewIsomorphicAuthdogParams) {
    const { AuthdogClient = null, authnApi, options = {} } = params || {};

    this.authnApi = authnApi;
    this.options = options;
    this.AuthdogClient = AuthdogClient; // initialize Authdog object
    this.mode = inClientSide() ? "browser" : "server";

    void this.loadAuthdogJS();
  }

  public addOnLoaded = (_: () => void) => {
    // this.loadedListeners.push(cb);
  };

  get thisMode() {
    return this.mode;
  }

  // TODO: implement logic
  addListener = (_: (emission: any) => void): void => {
    // const callback = () => this.authdogJs?.addListener(listener);
    // if (this.authdogJs) {
    //   callback();
    // } else {
    //   this.premountMethodCalls.set("addListener", callback);
    // }
  };

  async loadAuthdogJS(): Promise<
    HeadlessBrowserAuthdog | BrowserAuthdog | undefined
  > {
    if (this.mode !== "browser" || this.#loaded) {
      return;
    }

    if (!this.authnApi) {
      this.throwError(noauthnApiError);
    }

    // For more information refer to:
    // - https://github.com/remix-run/remix/issues/2947
    // - https://github.com/facebook/react/issues/24430
    window.__authdog_authn_api = this.authnApi;


    if (this.AuthdogClient) {
      // Set a fixed Authdog version
      let dog: AuthdogProp;

      if (isConstructor<BrowserAuthdogConstructor | HeadlessBrowserAuthdogConstrutor>(this.AuthdogClient)) {
        // Construct a new Clerk object if a constructor is passed
        dog = new this.AuthdogClient(this.authnApi);
        // await dog.init();
        // await dog.load(this.options);
        await dog.load();
      } 
      // else {
      //   // Otherwise use the instantiated Authdog object
      //   dog = this.Authdog;

      //   // if (!dog.isReady()) {
      //   //   await dog.load(this.options);
      //   // }
      // }

      // @ts-ignore
      global.Authdog = dog;

    }

    return;
  }

  // Custom wrapper to throw an error, since we need to apply different handling between
  // production and development builds. In Next.js we can throw a full screen error in
  // development mode. However, in production throwing an error results in an infinite loop
  // as shown at https://github.com/vercel/next.js/issues/6973
  throwError(errorMsg: string): void {
    if (process.env.NODE_ENV === 'production') {
      console.error(errorMsg);
    }
    throw new Error(errorMsg);
  }

  get client(): ClientResource | undefined {
    if (this.authdogJs) {
      // TODO: extend type
      // @ts-ignore
      return this.authdogJs.client;
      // TODO: add ssr condition
    } else {
      return undefined;
    }
  }

}
