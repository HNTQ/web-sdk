import * as React from "react";
import * as t from "./types";
import * as e from "./errors";

const INITIAL_VALUES: t.IUserUserContextState = {
  user: null
};

const UserContext = React.createContext<t.IUseUserContext>({
  state: { ...INITIAL_VALUES }
});

const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(e.missingContextParentError);
  }
  return context;
};

export { UserContext, useUser };
