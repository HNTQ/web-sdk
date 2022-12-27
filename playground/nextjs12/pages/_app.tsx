import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthdogProvider } from "@authdog/nextjs";

export default function App({ Component, pageProps }: AppProps) {
  const authnApi = "https://aws.us-east1.cdn.authdog.com/graphql";

  return (
    <AuthdogProvider authnApi={authnApi} {...pageProps}>
      <Component {...pageProps} />
    </AuthdogProvider>
  );
}
