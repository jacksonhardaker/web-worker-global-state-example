import type { AppProps } from "next/app";

import "../styles/globals.css";
import { WorkerProvider as V1 } from "@v1/components/WorkerProvider";
import { createStore } from "@v2/createStore";

export const initialState = {
  count: 0,
  things: "wow",
};

export type State = typeof initialState;

const { Provider } = createStore({ initialState });

const WorkerProvider = V1;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WorkerProvider initialState={initialState}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </WorkerProvider>
  );
};

export default App;
