export interface IContextProviderProps {
  children: React.ReactNode;
  stateOverride?: ISigninContextState;
}

export interface ISigninContextState {
  webLoginUri: string | null;
}
