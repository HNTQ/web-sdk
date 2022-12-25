import {
  AuthdogProp,
  BrowserAuthdog,
  HeadlessBrowserAuthdog,
  IsomorphicAuthdogOptions
} from "./types";
import { inClientSide } from "./utils";

export type NewIsomorphicAuthdogParams = {
  frontendApi: string;
  options: IsomorphicAuthdogOptions;
  Authdog: AuthdogProp | null;
};

export class IsomorphicAuthdog {
  private mode: "browser" | "server";
  private frontendApi: string;
  private options: IsomorphicAuthdogOptions;
  private Authdog: AuthdogProp;
  private authdogJs: BrowserAuthdog | HeadlessBrowserAuthdog | null = null;

  static #instance: IsomorphicAuthdog;

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
  }

  public addOnLoaded = (_: () => void) => {
    // this.loadedListeners.push(cb);
  };

  get thisMode() {
    return this.mode;
  }
}
