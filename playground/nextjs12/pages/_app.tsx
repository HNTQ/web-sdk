import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthdogProvider } from '@authdog/nextjs';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthdogProvider {...pageProps}>
      <Component {...pageProps} />
    </AuthdogProvider>
  );
}
