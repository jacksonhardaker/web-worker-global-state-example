import {
  useEffect,
  useState as useBaseState,
  useCallback,
  SetStateAction,
  Dispatch,
  useRef,
} from "react";
import { useWorker } from "./useWorker";

export const useState = <
  T extends Record<string, any>,
  K extends keyof T = keyof T
>(
  key: K
) => {
  const { subscribe, set, get, initialState } = useWorker<T>() || {};
  const [state, setBaseState] = useBaseState<T[K]>(initialState?.[key]);
  const subscribed = useRef(false);

  if (!subscribed.current) {
    subscribe?.(key, (data) => {
      setBaseState(data);
    });
    subscribed.current = true;
  }

  /**
   * Initialize
   */
  useEffect(() => {
    get?.(key);
  }, [get, key]);

  const setState = useCallback(
    (value: SetStateAction<T[K]>) => {
      if (value instanceof Function) {
        if (state !== undefined) {
          set?.(key, value(state));
        }
      } else {
        set?.(key, value);
      }
    },
    [set, key, state]
  );

  const value: [T[K] | undefined, Dispatch<SetStateAction<T[K]>>] = [
    state,
    setState,
  ];

  return value;
};
