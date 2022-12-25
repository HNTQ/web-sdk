import { createContextAndHook } from "@authdog/shared";
// import type { ActJWTClaim, MembershipRole } from '@clerk/types';

export const [AuthContext, useAuthContext] = createContextAndHook<{
  user: any;
  //   userId: string | null | undefined;
  //   sessionId: string | null | undefined;
  //   actor: ActJWTClaim | null | undefined;
  //   orgId: string | null | undefined;
  //   orgRole: MembershipRole | null | undefined;
  //   orgSlug: string | null | undefined;
}>("AuthContext");
