import { GetServerSidePropsContext } from "next";

import { AuthData, ContextWithAuth } from "../types";

/**
 * Inject `auth`, `user` and `session` properties into ctx.request
 * @internal
 */
export function injectAuthIntoRequest(
  ctx: GetServerSidePropsContext,
  authData: AuthData
): ContextWithAuth {
  const {
    user
    //session, userId, sessionId, getToken, claims, organization
  } = authData;
  (ctx.req as any).auth = {
    user: {
      id: user?.id
    }
    // userId,
    // sessionId,
    // getToken,
    // claims,
    // actor: claims?.act || null,
  };
  (ctx.req as any).user = user;
  // (ctx.req as any).session = session;
  // (ctx.req as any).organization = organization;
  return ctx as ContextWithAuth;
}
