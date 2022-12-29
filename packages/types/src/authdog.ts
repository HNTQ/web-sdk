import { ClientResource } from "./client";

export interface IAuthdog {
  /** Client handling most Clerk operations. */
  client?: ClientResource;
}

// export interface LoadedAuthdog extends IAuthdog {
//   client: ClientResource;
// }
