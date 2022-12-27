import { ActiveSessionResource } from '@authdog/types';

import { makeContextAndHook } from '../utils/makeContextAndHook';

/**
 * @internal
 */
export const [SessionContext, useSessionContext] = makeContextAndHook<ActiveSessionResource | null | undefined>(
  'SessionContext',
);