import { BrowserAuthdog, HeadlessBrowserAuthdog } from "./types";
import { inClientSide } from "./utils";
import { ClientResource, AuthdogInstance } from "@authdog/types";

export type NewIsomorphicAuthdogParams = {
  authnApi: string;
};

export class IsomorphicAuthdog {
  private mode: "browser" | "server";
  private authnApi: string;
  private authdogInstance: AuthdogInstance | null = null;

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

  constructor({ authnApi }: NewIsomorphicAuthdogParams) {
    this.authnApi = authnApi;
    this.mode = inClientSide() ? "browser" : "server";

    if (this.mode === "browser") {
      void this.authenticateBrowserParty();
    } else {
      // TODO
      // void this.authenticateServerParty();
    }
  }
  client!: ClientResource;
  value?: any;

  public addOnLoaded = (_: () => void) => {
    // this.loadedListeners.push(cb);
  };

  get thisMode() {
    return this.mode;
  }

  /*
   * This method is used to get the Authdog authentication endpoint.
   */
  get thisAuthnApi() {
    return this.authnApi;
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

  async authenticateBrowserParty(): Promise<
    HeadlessBrowserAuthdog | BrowserAuthdog | undefined
  > {
    if (this.mode !== "browser" || this.#loaded) {
      return;
    }

    console.log("authenticateBrowserParty");

    // TODO: check if domain is Authdog dev domain
    // if so: extract token from URI
    // else: read cookies, extract token from Cookies

    this.#loaded = true;
    return;
  }

  // Custom wrapper to throw an error, since we need to apply different handling between
  // production and development builds. In Next.js we can throw a full screen error in
  // development mode. However, in production throwing an error results in an infinite loop
  // as shown at https://github.com/vercel/next.js/issues/6973
  throwError(errorMsg: string): void {
    if (process.env.NODE_ENV === "production") {
      console.error(errorMsg);
    } else {
      throw new Error(errorMsg);
    }
  }
}
