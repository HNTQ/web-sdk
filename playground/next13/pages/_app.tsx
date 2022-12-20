import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthdogContextProvider } from "@authdog/authdog-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthdogContextProvider>
      <Component {...pageProps} />
    </AuthdogContextProvider>
  );
}
