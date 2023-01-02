import { UserResource } from "@authdog/types";

export interface IContextProviderProps {
  children: React.ReactNode;
  stateOverride?: IUserUserContextState;
}

export interface IUserUserContextState {
  user: UserResource | null;
}

export interface IUseUserContext {
  state: IUserUserContextState;
}

export interface IContextUserAction {
  type: string;
  payload: any;
}
