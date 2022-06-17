import { useContext } from "react";
import { WorkerContext } from "../context";
import type { WorkerContextType } from "../context";

export const useWorker = <T>() => {
  const value = useContext<WorkerContextType<T> | null>(WorkerContext);
  return value;
};
