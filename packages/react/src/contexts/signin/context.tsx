import * as React from "react";
import * as t from "./types";
import * as e from "./errors";

const INITIAL_VALUES: t.ISigninContextState = {
  signinUri: null
};

const SigninContext = React.createContext<t.ISigninContextState>({
  signinUri: INITIAL_VALUES.signinUri
});

const useSignin = () => {
  const context = React.useContext(SigninContext);
  if (context === undefined) {
    throw new Error(e.missingContextParentError);
  }
  return context;
};

export { SigninContext, useSignin };
