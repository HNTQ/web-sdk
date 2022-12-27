import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthdogProvider } from "@authdog/nextjs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthdogProvider
      frontendApi={"http://localhost:3000/api/authdog"}    
    {...pageProps}>
      <Component {...pageProps} />
    </AuthdogProvider>
  );
}
