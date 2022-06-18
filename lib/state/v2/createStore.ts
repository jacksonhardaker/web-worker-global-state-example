import React, { createContext } from "react";
import { providerFactory } from "@v2/Provider";
import { Store } from "@v2/types";

type State = Record<string, any>;

type CreateStoreArgs<T extends State> = { initialState: T };
type CreateStoreReturn = {
  Provider: ({ children }: React.PropsWithChildren) => JSX.Element;
};

export const createStore = <T extends State>({
  initialState,
}: CreateStoreArgs<T>): CreateStoreReturn => {
  const ctx = createContext<Store<T>>({ initialState });

  const Provider = providerFactory(initialState, ctx);

  return { Provider };
};
