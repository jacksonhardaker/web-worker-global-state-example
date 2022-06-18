import { useContext } from "react";
import { WorkerContext } from "@v1/context";
import type { WorkerContextType } from "@v1/types";

export const useWorker = <T>() => {
  const value = useContext<WorkerContextType<T> | null>(WorkerContext);
  return value;
};
