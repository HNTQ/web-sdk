import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import { AuthdogProvider } from "@authdog/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});

export default function App() {
  const authnApi = "https://aws.us-east1.cdn.authdog.com";
  const webLoginUri =
    "https://weblogin.authdog.com?id=a0b7f44c-87a2-4ea6-bc7e-76cf2a019996";

  return (
    <AuthdogProvider authnApi={authnApi} webLoginUri={webLoginUri}>
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </AuthdogProvider>
  );
}
