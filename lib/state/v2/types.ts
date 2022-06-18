export type Store<T extends Record<string, any>> = {
  initialState: T;
};
