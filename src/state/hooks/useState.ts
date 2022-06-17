import {
  useEffect,
  useState as useBaseState,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { useWorker } from "./useWorker";

export const useState = <T extends unknown>(key: string, initialValue: T) => {
  const { subscribe, set, get } = useWorker<T>() || {};
  const [state, setBaseState] = useBaseState<T>(initialValue);

  useEffect(() => {
    subscribe?.(key, (data) => {
      setBaseState(data);
    });
  }, [subscribe, key, setBaseState]);

  const setState = useCallback(
    (value: SetStateAction<T>) => {
      if (value instanceof Function) {
        set?.(key, value(state));
      } else {
        set?.(key, value);
      }
    },
    [set, key, state]
  );

  const value: [T, Dispatch<SetStateAction<T>>] = [state, setState];

  return value;
};
