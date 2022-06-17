import type { AppProps } from "next/app";

import "../styles/globals.css";
import { WorkerProvider } from "../src/state/components/WorkerProvider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WorkerProvider>
      <Component {...pageProps} />
    </WorkerProvider>
  );
};

export default App;
