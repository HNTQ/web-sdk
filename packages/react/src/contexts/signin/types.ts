export interface IContextProviderProps {
  children: React.ReactNode;
  stateOverride?: ISigninContextState;
}

export interface ISigninContextState {
  signinUri: string | null;
}

export interface IContextUserAction {
  type: string;
  payload: any;
}
