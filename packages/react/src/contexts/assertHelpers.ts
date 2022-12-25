import { noAuthdogProviderError, noGuaranteedLoadedError } from "../errors";

export function assertWrappedByAuthdogProvider(
  contextVal: unknown
): asserts contextVal {
  if (!contextVal) {
    throw new Error(noAuthdogProviderError);
  }
}

export function assertAuthdogLoadedGuarantee(
  guarantee: unknown,
  hookName: string
): asserts guarantee {
  if (!guarantee) {
    throw new Error(noGuaranteedLoadedError(hookName));
  }
}
