import { BrowserAuthdog, HeadlessBrowserAuthdog } from "./types";
import { inClientSide } from "./utils";

export class IsomorphicAuthdog {
  private mode: 'browser' | 'server';
  private authdogJs: BrowserAuthdog | HeadlessBrowserAuthdog | null = null;
  constructor() {
    this.mode = inClientSide() ? 'browser' : 'server';
  }

  get thisMode() {
    return this.mode;
  }
}
