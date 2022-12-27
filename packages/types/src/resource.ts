export type AuthdogResourceReloadParams = {
  rotatingTokenNonce?: string;
};

export interface AuthdogResource {
  readonly id?: string | undefined;
//   pathRoot: string;
  //reload(p?: AuthdogResourceReloadParams): Promise<this>;
}
