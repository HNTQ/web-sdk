import React from "react";
import { IsomorphicAuthdog, NewIsomorphicAuthdogParams } from "../isomorphic";
import { AuthdogIsomorphicOptions } from "./AuthdogProvider";
import { IsomorphicAuthdogContext } from "./IsomorphicAuthdogContext";
import { UserContext } from "./user/UserContext";

export const AuthdogContextProvider = (props: {
  children: React.ReactNode;
  isomorphicAuthdogOptions: AuthdogIsomorphicOptions;
  initialState?: any;
}): JSX.Element | null => {
  const { isomorphicAuthdogOptions, children } = props;
  const { isomorphicAuthdog, loaded } = useLoadedIsomorphicAuthdog(
    isomorphicAuthdogOptions
  );
  const authdogCtx = React.useMemo(
    () => ({ value: isomorphicAuthdog }),
    [loaded]
  );
  const userCtx = React.useMemo(
    () => ({
      state: {
        user: isomorphicAuthdog.currentUser
      }
    }),
    [loaded]
  );

  return (
    <IsomorphicAuthdogContext.Provider value={authdogCtx}>
      <UserContext.Provider value={userCtx}>{children}</UserContext.Provider>
    </IsomorphicAuthdogContext.Provider>
  );
};

const useLoadedIsomorphicAuthdog = (options: NewIsomorphicAuthdogParams) => {
  const [loaded, setLoaded] = React.useState(false);
  const isomorphicAuthdog = React.useMemo(
    () => IsomorphicAuthdog.getOrCreateInstance(options),
    []
  );

  React.useEffect(() => {
    isomorphicAuthdog.addOnLoaded(() => {
      setLoaded(true);
    });
  }, []);

  return { isomorphicAuthdog, loaded };
};
