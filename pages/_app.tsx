import type { AppProps } from "next/app";

import "../styles/globals.css";
import { WorkerProvider } from "../src/state/v1/components/WorkerProvider";

export type State = {
  count: number;
  things: string;
};

export const initialState: State = {
  count: 0,
  things: "wow",
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WorkerProvider initialState={initialState}>
      <Component {...pageProps} />
    </WorkerProvider>
  );
};

export default App;
