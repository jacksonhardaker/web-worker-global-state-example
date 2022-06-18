import { createContext } from "react";
import { WorkerContextType } from "@v1/types";

export const WorkerContext = createContext<WorkerContextType<
  Record<string, any>
> | null>(null);
