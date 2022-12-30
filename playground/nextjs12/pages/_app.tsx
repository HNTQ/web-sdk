import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthdogProvider } from "@authdog/nextjs";

export default function App({ Component, pageProps }: AppProps) {
  const authnApi = "https://aws.us-east1.cdn.authdog.com";
  const signinUri = "https://weblogin.authdog.com?id=a0b7f44c-87a2-4ea6-bc7e-76cf2a019996";
  return (
    <AuthdogProvider
      authnApi={authnApi}
      signinUri={signinUri}
      {...pageProps}>
      <Component {...pageProps} />
    </AuthdogProvider>
  );
}
