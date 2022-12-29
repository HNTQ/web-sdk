import {
  AuthdogInstance,
  ActiveSessionResource,
  ClientResource,
  UserResource
} from "@authdog/types";
import { createContextAndHook } from "./createContextAndHook";

const [AuthdogInstanceContext, useAuthdogInstanceContext] =
  createContextAndHook<AuthdogInstance>("AuthdogInstanceContext");

const [UserContext, useUserContext] = createContextAndHook<
  UserResource | null | undefined
>("UserContext");
const [ClientContext, useClientContext] = createContextAndHook<
  ClientResource | null | undefined
>("ClientContext");
const [SessionContext, useSessionContext] = createContextAndHook<
  ActiveSessionResource | null | undefined
>("SessionContext");

export {
  AuthdogInstanceContext,
  useAuthdogInstanceContext,
  UserContext,
  useUserContext,
  ClientContext,
  useClientContext,
  SessionContext,
  useSessionContext
};
