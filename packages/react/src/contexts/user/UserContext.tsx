import * as React from "react";
import * as c from './constants';
import * as t from "./types";
import * as e from "./errors";

const INITIAL_VALUES = {
  user: null,
};

const UserContext = React.createContext<t.IUseUserContext>({
  state: { ...INITIAL_VALUES },
  dispatch: () => {}
});

const userReducer = (state: t.IUserUserContextState, action: any) =>  {
  const payload = action.payload;
  
  switch(action.type) {
    case c.SET_USER:
      return {
        ...state,
        user: payload
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const UserContextProvider = ({ children, stateOverride = INITIAL_VALUES }: t.IContextProviderProps) => {
  const [state, dispatch] = React.useReducer(userReducer, { ...stateOverride });
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(e.missingContextParentError);
  }
  return context;
};

export { UserContextProvider, useUserContext };
