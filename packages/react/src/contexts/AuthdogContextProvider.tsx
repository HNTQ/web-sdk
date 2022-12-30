import React from "react";
import { IsomorphicAuthdog, NewIsomorphicAuthdogParams } from "../isomorphic";
import { AuthContext } from "./AuthContext";
import { AuthdogIsomorphicOptions } from "./AuthdogProvider";

import { IsomorphicAuthdogContext } from "./IsomorphicAuthdogContext";
import { UserContext } from "./UserContext";

type AuthdogContextProvider = {
  children: React.ReactNode;
};

type AuthdogContextProviderState = {
  user: any | null;
};

export function AuthdogContextProvider(props: {
  children: React.ReactNode;
  isomorphicAuthdogOptions: AuthdogIsomorphicOptions;
  initialState?: any;
}): JSX.Element | null {
  const { isomorphicAuthdogOptions, initialState, children } = props;
  const { isomorphicAuthdog: authdog, loaded: authdogLoaded } =
    useLoadedIsomorphicAuthdog(isomorphicAuthdogOptions);

  const [state] = React.useState<AuthdogContextProviderState>({
    user: authdog.user
  });

  const authdogCtx = React.useMemo(() => ({ value: authdog }), [authdogLoaded]);
  const authCtx = React.useMemo(
    () => ({ value: { user: state.user } }),
    [state.user]
  );

  const userCtx = React.useMemo(() => {
    return { value: state.user };
  }, [state.user]);

  return (
    <IsomorphicAuthdogContext.Provider value={authdogCtx}>
      <AuthContext.Provider value={authCtx}>
        <UserContext.Provider value={userCtx}>{children}</UserContext.Provider>
      </AuthContext.Provider>
    </IsomorphicAuthdogContext.Provider>
  );
}

const useLoadedIsomorphicAuthdog = (options: NewIsomorphicAuthdogParams) => {
  const [loaded, setLoaded] = React.useState(false);
  const isomorphicAuthdog = React.useMemo(
    () => IsomorphicAuthdog.getOrCreateInstance(options),
    []
  );

  React.useEffect(() => {
    isomorphicAuthdog.addOnLoaded(() => setLoaded(true));
  }, []);

  return { isomorphicAuthdog, loaded };
};
