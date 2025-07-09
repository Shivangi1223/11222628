const logs = [];

export const logger = (message) => {
  const timestamp = new Date().toLocaleString();
  const entry = `[${timestamp}] ${message}`;
  logs.push(entry);
};

export const getLogs = () => logs;
