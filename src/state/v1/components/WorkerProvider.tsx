import { PropsWithChildren, useRef, useMemo, useCallback } from "react";
import { WorkerContext } from "../context";
import type {
  Set,
  Get,
  Subscribe,
  WorkerContextType,
  Action,
  Subscribers,
} from "../types";

export const WorkerProvider = <T extends Record<string, any>>({
  children,
  initialState,
}: PropsWithChildren<{
  initialState: T;
}>) => {
  const initialized = useRef(false);
  // const [worker, setWorker] = useState<Worker | null>(null);
  const { current: worker } = useRef(
    (() => {
      if (
        typeof window !== "undefined" &&
        window.Worker &&
        !initialized.current
      ) {
        const w = new Worker("worker/v1.js");
        w.postMessage(["init", initialState]);
        initialized.current = true;
        return w;
      }
    })()
  );
  const subscribers = useRef<Subscribers<T>>(
    Object.keys(initialState).reduce(
      (acc, key) => ({
        ...acc,
        [key]: [],
      }),
      {} as Subscribers<T>
    )
  );

  if (initialized.current && worker) {
    worker.onmessage = ({ data }: { data: [Action, keyof T, T[keyof T]] }) => {
      const [action, key, value] = data;
      console.log({ action, key, value });
      if (action === "get" || action === "set") {
        subscribers?.current?.[key]?.forEach?.((listener) => listener(value));
      }
    };
  }

  const get = useCallback<Get<T>>(
    (key) => {
      worker?.postMessage(["get", key]);
    },
    [worker]
  );

  const set = useCallback<Set<T>>(
    (key, value) => {
      worker?.postMessage(["set", [key, value]]);
    },
    [worker]
  );

  const subscribe = useCallback<Subscribe<T>>((key, listener) => {
    subscribers.current[key] = [...(subscribers.current[key] || []), listener];
  }, []);

  const value = useMemo<WorkerContextType<T>>(
    () => ({
      subscribe,
      set,
      get,
      initialState,
    }),
    [subscribe, set, get, initialState]
  );

  return (
    <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>
  );
};
