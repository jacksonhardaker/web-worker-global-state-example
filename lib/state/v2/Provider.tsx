import React from "react";
import { Store } from "@v2/types";

export const providerFactory = <T extends Record<string, any>>(
  value: T,
  ctx: React.Context<Store<T>>
) => {
  const Provider = ({ children }: React.PropsWithChildren) => {
    const ctxValue: Store<T> = {
      initialState: value,
    };
    return <ctx.Provider value={ctxValue}>{children}</ctx.Provider>;
  };

  return Provider;
};
