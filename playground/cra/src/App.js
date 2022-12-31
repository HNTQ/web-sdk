import { useEffect, useState } from "react";

import {
  getSessionTokenFromStorage,
  persistTokenFromUri,
  logout
} from "@authdog/sdk-browser";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    persistTokenFromUri();
    if (getSessionTokenFromStorage() !== null) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: '100vh' }}>
      <div className="App" style={{ textAlign: "center", border: "1px solid black", width: '30vw' }}>
        <h1>Welcome to Authdog!</h1>
        <h3>Create React App sample</h3>

        {authenticated ? (
          <span
            onClick={() => {
              logout({});
            }}
            style={{ cursor: "pointer" }}
          >
            Sign Out
          </span>
        ) : (
          <a href="https://weblogin.authdog.com?id=a0b7f44c-87a2-4ea6-bc7e-76cf2a019996">
            Signin
          </a>
        )}
      </div>
    </div>
    
  );
}

export default App;
