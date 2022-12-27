import { createContextAndHook } from "@authdog/shared";

export const [AuthContext, useAuthContext] = createContextAndHook<{
  user: any;
}>("AuthContext");
