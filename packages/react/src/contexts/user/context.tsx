import * as React from "react";
import * as t from "./types";
import * as e from "./errors";

const INITIAL_VALUES: t.IUserContextState = {
  user: null
};

const UserContext = React.createContext<t.IUserContextState>({
  user: INITIAL_VALUES.user
});

const useIdentity = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(e.missingContextParentError);
  }
  return context;
};

export { UserContext, useIdentity };
