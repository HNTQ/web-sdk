import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthdogProvider } from "@authdog/react";

const authnApi = "https://aws.us-east1.cdn.authdog.com";
const signinUri =
  "https://weblogin.authdog.com?id=a0b7f44c-87a2-4ea6-bc7e-76cf2a019996";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthdogProvider authnApi={authnApi} signinUri={signinUri}>
      <App />
    </AuthdogProvider>
  </React.StrictMode>
);

reportWebVitals();
