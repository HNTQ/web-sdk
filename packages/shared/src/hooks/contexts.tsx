import { LoadedAuthdog } from "@authdog/types";
import { createContextAndHook } from "./createContextAndHook";

const [AuthdogInstanceContext, useAuthdogInstanceContext] =
  createContextAndHook<LoadedAuthdog>("AuthdogInstanceContext");

export { AuthdogInstanceContext, useAuthdogInstanceContext };
