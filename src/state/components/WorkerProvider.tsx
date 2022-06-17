import {
  Dispatch,
  FC,
  PropsWithChildren,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { WorkerContext } from "../context";

export const WorkerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const subscribers = useRef<Dispatch<unknown>[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Worker) {
      setWorker(new Worker("worker.js"));
    }
  }, []);

  useEffect(() => {
    if (worker) {
      worker.onmessage = ({ data }) => {
        const [action, payload] = data;
        if (action === "set") {
          subscribers.current.forEach((listener) => listener(payload));
        }
      };
    }
  }, [worker]);

  const get = useCallback(
    (key: string) => {
      worker?.postMessage(["get", key]);
    },
    [worker]
  );

  const set = useCallback(
    (key: string, value: unknown) => {
      worker?.postMessage(["set", [key, value]]);
    },
    [worker]
  );

  const subscribe = useCallback((key: string, listener: Dispatch<unknown>) => {
    subscribers.current.push(listener);
  }, []);

  const value = useMemo(
    () => ({
      worker,
      subscribe,
      set,
      get,
    }),
    [worker, subscribe, set, get]
  );

  return (
    <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>
  );
};
