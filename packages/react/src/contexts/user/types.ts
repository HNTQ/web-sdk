import { UserResource } from "@authdog/types";

export interface IContextProviderProps {
  children: React.ReactNode;
  stateOverride?: IUserContextState;
}

export interface IUserContextState {
  user: UserResource | null;
}
