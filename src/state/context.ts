import { createContext, Dispatch } from "react";

export type Subscribe<T> = (key: string, listener: Dispatch<T>) => void;
export type Set<T> = (key: string, value: T) => void;
export type Get = (key: string) => void;

export type WorkerContextType<T = any> = {
  worker: Worker | null;
  subscribe: Subscribe<T>;
  set: Set<T>;
  get: Get;
};

export const WorkerContext = createContext<WorkerContextType | null>(null);
