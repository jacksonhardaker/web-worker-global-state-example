import { Dispatch } from "react";

export type Action = "set" | "get";

type State = Record<string, any>;
type Key<T extends State> = keyof T;

export type Subscribers<T extends State, K extends Key<T> = Key<T>> = Record<
  K,
  Dispatch<T[K]>[]
>;

export type Subscribe<T extends State, K extends Key<T> = Key<T>> = (
  key: K,
  listener: Dispatch<T[K]>
) => void;
export type Set<T extends State, K extends Key<T> = Key<T>> = (
  key: K,
  value: T[K]
) => void;
export type Get<T extends State, K extends Key<T> = Key<T>> = (key: K) => void;

export type WorkerContextType<T extends State> = {
  subscribe: Subscribe<T>;
  set: Set<T>;
  get: Get<T>;
  initialState: T;
};
