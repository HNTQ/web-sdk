// import React from 'react';
import { ClientResource } from "@authdog/types";

import { makeContextAndHook } from "../utils/makeContextAndHook";

/**
 * @internal
 */
export const [ClientContext, useClientContext] = makeContextAndHook<
  ClientResource | undefined | null
>("ClientContext");
