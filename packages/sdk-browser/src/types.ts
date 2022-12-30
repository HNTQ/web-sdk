export interface IFetchUser {
  environmentId: TEnvironmentId;
  originId?: TOriginId;
  Authorization: TAuthorization;
  verifySsl?: TVerifySsl;
  authnUri?: TPlatformUri;
}

export interface ILogoutUser {
  environmentId?: TEnvironmentId; // will be used in SSO context
  authnUri?: TPlatformUri;
  domain?: TDomain;
}

export interface IUriParameters {
  environmentId?: TEnvironmentId;
  session: TAdogSession;
}

export interface IInitSessionParameters {
  environmentId?: TEnvironmentId;
  origin?: TOriginId;
}

export type TEnvironmentId = string | null;
export type TOriginId = string | null;
export type TDomain = string;
export type TPlatformUri = string;
export type TAdogSession = string;
export type TAuthorization = string;
export type TVerifySsl = boolean;
