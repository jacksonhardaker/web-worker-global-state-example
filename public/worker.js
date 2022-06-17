const state = new Map();

onmessage = function ({ data = [] }) {
  const [action, payload] = data;
  console.log({ data });
  switch (action) {
    case "get": {
      console.log(`Getting ${payload}`);
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
