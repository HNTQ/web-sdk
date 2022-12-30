import { BrowserAuthdog, HeadlessBrowserAuthdog } from "./types";
import { inClientSide } from "./utils";
import {
  fetchUserInfos,
  getParamFromUri,
  getSessionCredentials
} from "@authdog/sdk-browser";

export type NewIsomorphicAuthdogParams = {
  authnApi: string;
  signinUri: string;
};

export class IsomorphicAuthdog {
  private mode: "browser" | "server";
  private authnApi: string;
  private signinUri: string;

  static #instance: IsomorphicAuthdog;

  #loaded = false;
  user: any;

  get loaded(): boolean {
    return this.#loaded;
  }

  static getOrCreateInstance(params: NewIsomorphicAuthdogParams) {
    if (!inClientSide() || !this.#instance) {
      this.#instance = new IsomorphicAuthdog(params);
    }
    return this.#instance;
  }

  constructor({ authnApi, signinUri }: NewIsomorphicAuthdogParams) {
    this.authnApi = authnApi;
    this.signinUri = signinUri;

    this.mode = inClientSide() ? "browser" : "server";

    if (this.mode === "browser") {
      void this.authenticateBrowserParty();
    } else {
      // TODO
      // void this.authenticateServerParty();
    }
  }
  value?: any;

  // TODO: check if useful
  public addOnLoaded = (_: () => void) => {
    // this.loadedListeners.push(cb);
  };

  get thisMode() {
    return this.mode;
  }

  get thisAuthnApi() {
    return this.authnApi;
  }

  get thisSigninUri() {
    return this.signinUri;
  }

  async authenticateBrowserParty(): Promise<
    HeadlessBrowserAuthdog | BrowserAuthdog | undefined
  > {
    if (this.mode !== "browser" || this.#loaded) {
      return;
    }

    const environmentId = getParamFromUri(this.signinUri, "id");
    const { Authorization } = getSessionCredentials({ environmentId });

    if (Authorization) {
      fetchUserInfos({
        environmentId,
        Authorization,
        authnUri: this.authnApi
      }).then((user: any) => {
        console.log(user);
        // setIsFetching(false);
      });
    }

    // console.log("authenticateBrowserParty");

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
