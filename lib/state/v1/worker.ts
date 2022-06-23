let state = new Map();

console.log('worker with ts');

onmessage = function ({ data = [] }) {
  const [action, payload] = data;
  console.log({ data });
  switch (action) {
    case "init": {
      console.log("Initializing");
      const initialState = payload;
      state = new Map(Object.entries(initialState));
      return this.postMessage(["init", state]);
    }
    case "get": {
      console.log(`Getting`, { payload });
      const key = payload;
      return this.postMessage(["get", key, state.get(key)]);
    }
    case "set": {
      console.log(`Setting ${payload}`);
      const [key, value] = payload;
      state.set(key, value);
      return this.postMessage(["set", key, value]);
    }
  }
};
