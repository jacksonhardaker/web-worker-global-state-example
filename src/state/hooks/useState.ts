import {
  useEffect,
  useState as useBaseState,
  useCallback,
  SetStateAction,
} from "react";
import { useWorker } from "./useWorker";

export const useState = (key: string, initialValue: unknown) => {
  const { subscribe, set, get } = useWorker() || {};
  const [state, setBaseState] = useBaseState<unknown>();

  useEffect(() => {
    const existingValue = get?.(key);
    console.log({ existingValue });
    if (existingValue) {
      setBaseState(existingValue);
    } else {
      set?.(key, initialValue);
    }
  }, [get, initialValue, key, set, setBaseState]);

  useEffect(() => {
    subscribe?.(key, (data: unknown) => {
      setBaseState(data);
    });
  }, [subscribe, key, setBaseState]);

  const setState = useCallback(
    (value: SetStateAction<unknown>) => {
      if (typeof value === "function") {
        set?.(key, value(state));
      } else {
        set?.(key, value);
      }
    },
    [set, key, state]
  );

  return [state, setState];
};
