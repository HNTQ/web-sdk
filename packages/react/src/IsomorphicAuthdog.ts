import { inClientSide } from "./utils";

export class IsomorphicAuthdog {
  #clientSide: boolean;
  constructor() {
    this.#clientSide = inClientSide();
  }

  get isClient() {
    return this.#clientSide;
  }
}
