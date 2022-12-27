import {
  AuthdogProp,
  BrowserAuthdog,
  HeadlessBrowserAuthdog,
  IsomorphicAuthdogOptions
} from "./types";
import { inClientSide } from "./utils";
import { noFrontendApiError } from "./errors";

export type NewIsomorphicAuthdogParams = {
  frontendApi: string;
  options: IsomorphicAuthdogOptions;
  Authdog: AuthdogProp | null;
};

type MethodName<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];
type MethodCallback = () => void;

export class IsomorphicAuthdog {
  private mode: "browser" | "server";
  private frontendApi: string;
  private options: IsomorphicAuthdogOptions;
  private Authdog: AuthdogProp;
  private authdogJs: BrowserAuthdog | HeadlessBrowserAuthdog | null = null;
  private premountMethodCalls = new Map<
    MethodName<BrowserAuthdog>,
    MethodCallback
  >();

  static #instance: IsomorphicAuthdog;

  #loaded = false;

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
    const { Authdog = null, frontendApi, options = {} } = params || {};

    this.frontendApi = frontendApi;
    this.options = options;
    this.Authdog = Authdog;
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

    if (!this.frontendApi) {
      this.throwError(noFrontendApiError);
    }

    // For more information refer to:
    // - https://github.com/remix-run/remix/issues/2947
    // - https://github.com/facebook/react/issues/24430
    window.__authdog_frontend_api = this.frontendApi;

    return;
  }

  // Custom wrapper to throw an error, since we need to apply different handling between
  // production and development builds. In Next.js we can throw a full screen error in
  // development mode. However, in production throwing an error results in an infinite loop
  // as shown at https://github.com/vercel/next.js/issues/6973
  throwError(errorMsg: string): void {
    if (process.env.NODE_ENV === "production") {
      console.error(errorMsg);
    }
    throw new Error(errorMsg);
  }
}
