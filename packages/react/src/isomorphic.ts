import { BrowserAuthdog, HeadlessBrowserAuthdog } from "./types";
import { inClientSide } from "./utils";
import {
  fetchUserInfos,
  getParamFromUri,
  getSessionCredentials
} from "@authdog/browser";

import { UserResource } from "@authdog/types";

export type NewIsomorphicAuthdogParams = {
  authnApi: string;
  webLoginUri: string;
};

export class IsomorphicAuthdog {
  private mode: "browser" | "server";
  private authnApi: string;
  static #instance: IsomorphicAuthdog;
  private loadedListeners: Array<() => void> = [];

  #loaded = false;
  currentUser: UserResource | null = null;
  webLoginUri: string;

  get loaded(): boolean {
    return this.#loaded;
  }

  static getOrCreateInstance(params: NewIsomorphicAuthdogParams) {
    if (!inClientSide() || !this.#instance) {
      this.#instance = new IsomorphicAuthdog(params);
    }
    return this.#instance;
  }

  constructor({ authnApi, webLoginUri }: NewIsomorphicAuthdogParams) {
    this.authnApi = authnApi;
    this.webLoginUri = webLoginUri;

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
  public addOnLoaded = (cb: () => void) => {
    this.loadedListeners.push(cb);
  };

  public emitLoaded = () => {
    this.loadedListeners.forEach((cb) => cb());
    this.loadedListeners = [];
  };

  get thisMode() {
    return this.mode;
  }

  get thisAuthnApi() {
    return this.authnApi;
  }

  get thiswebLoginUri() {
    return this.webLoginUri;
  }

  async authenticateBrowserParty(): Promise<
    HeadlessBrowserAuthdog | BrowserAuthdog | undefined
  > {
    if (this.mode !== "browser" || this.#loaded) {
      return;
    }

    const environmentId = getParamFromUri(this.webLoginUri, "id");
    const { Authorization } = getSessionCredentials({ environmentId });

    if (Authorization) {
      fetchUserInfos({
        environmentId,
        Authorization,
        authnUri: this.authnApi
      }).then((user: any) => {
        this.currentUser = user;
        this.hydrateAuthdogJs();
      });
    }
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

  private hydrateAuthdogJs = async () => {
    this.#loaded = true;
    this.emitLoaded();
    return;
  };
}
