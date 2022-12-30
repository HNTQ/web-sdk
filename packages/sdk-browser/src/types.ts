export interface IFetchUser {
  environmentId: TEnvironmentId;
  originId?: TOriginId;
  Authorization: TAuthorization;
  verifySsl?: TVerifySsl;
  platformUri?: TPlatformUri;
}

export interface ILogoutUser {
  environmentId?: TEnvironmentId; // will be used in SSO context
  platformUri?: TPlatformUri;
  domain?: TDomain;
}

export interface IUriParameters {
  environmentId?: TEnvironmentId;
  session: TAdogSession;
}

export interface IInitSessionParameters {
  environmentId?: TEnvironmentId;
  originId?: TOriginId;
}

export type TEnvironmentId = string | undefined;
export type TOriginId = string | null;
export type TDomain = string;
export type TPlatformUri = string;
export type TAdogSession = string;
export type TAuthorization = string;
export type TVerifySsl = boolean;
