import {
  getSessionTokenFromStorage,
  persistTokenFromUri,
  logout
} from "@authdog/browser";
import { useEffect, useState } from "react";

export default function Index() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    persistTokenFromUri();
    if (getSessionTokenFromStorage() !== null) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <h3>for Cloudflare Workers</h3>
      <ul>
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
      </ul>
    </div>
  );
}
