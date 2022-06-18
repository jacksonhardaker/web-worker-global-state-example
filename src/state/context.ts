import { createContext } from "react";
import { WorkerContextType } from "./types";

export const WorkerContext = createContext<WorkerContextType<
  Record<string, any>
> | null>(null);
