import "@/styles/global.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <h1>Este sera el Layout</h1>
      <Component {...pageProps} />
    </>
  );
}
