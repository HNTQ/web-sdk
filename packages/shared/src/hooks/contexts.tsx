// import { LoadedAuthdog } from "@authdog/types";
import { createContextAndHook } from "./createContextAndHook";

const [AuthdogInstanceContext, useAuthdogInstanceContext] =
  createContextAndHook<any>("AuthdogInstanceContext");

export { AuthdogInstanceContext, useAuthdogInstanceContext };
