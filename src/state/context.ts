import { createContext, Dispatch } from "react";

export type WorkerContextType = {
  worker: Worker | null;
  subscribe: (key: string, listener: Dispatch<unknown>) => void;
  set: (key: string, value: unknown) => void;
  get: (key: string,) => unknown;
};

export const WorkerContext = createContext<WorkerContextType | null>(null);
