import * as React from "react";
import * as t from "./types";
import * as e from "./errors";

const INITIAL_VALUES: t.ISigninContextState = {
  webLoginUri: null
};

const SigninContext = React.createContext<t.ISigninContextState>({
  webLoginUri: INITIAL_VALUES.webLoginUri
});

const useSignin = () => {
  const context = React.useContext(SigninContext);
  if (context === undefined) {
    throw new Error(e.missingContextParentError);
  }
  return context;
};

export { SigninContext, useSignin };
