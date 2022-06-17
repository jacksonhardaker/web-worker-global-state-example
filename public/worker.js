const state = new Map();

onmessage = function ({ data = [] }) {
  const [action, payload] = data;
  console.log({ data });
  switch (action) {
    case "get":
      console.log(`Getting ${payload}`);
      return this.postMessage(["get", state.get(payload)]);
    case "set":
      console.log(`Setting ${payload}`);
      const [key, value] = payload;
      state.set(key, value);
      return this.postMessage(["set", value]);
    default:
      return this.postMessage("No Action");
  }
};
