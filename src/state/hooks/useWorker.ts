import { useContext } from "react";
import { WorkerContext } from "../context";

export const useWorker = () => useContext(WorkerContext);
