import type { AppProps } from "next/app";

import "../styles/globals.css";
import { WorkerProvider as V1 } from "../lib/state/v1/components/WorkerProvider";

export const initialState = {
  count: 0,
  things: "wow",
};

export type State = typeof initialState;

const WorkerProvider = V1;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WorkerProvider initialState={initialState}>
      <Component {...pageProps} />
    </WorkerProvider>
  );
};

export default App;
