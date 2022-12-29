import { ClientResource } from "./client";

export interface IAuthdog {
  value?: any;
}

export interface LoadedAuthdog extends IAuthdog {
  client: ClientResource;
}
