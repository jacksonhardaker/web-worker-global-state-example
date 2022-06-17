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
import type { Set, Get, Subscribe, WorkerContextType } from "../context";

export const WorkerProvider = <T extends unknown>({
  children,
}: PropsWithChildren) => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const subscribers = useRef<Record<string, Dispatch<T>[]>>({});

  useEffect(() => {
    if (typeof window !== "undefined" && window.Worker) {
      setWorker(new Worker("worker.js"));
    }
  }, []);

  useEffect(() => {
    if (worker) {
      worker.onmessage = ({ data }) => {
        const [action, key, value] = data;
        if (action === "set") {
          subscribers.current[key].forEach((listener) => listener(value));
        }
      };
    }
  }, [worker]);

  const get = useCallback<Get>(
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
