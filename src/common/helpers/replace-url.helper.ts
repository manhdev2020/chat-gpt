export const replaceUrl = (endpoint: string, params = {}) => {
  for (const key in params) {
    endpoint = endpoint.replace(`:${key}`, params[key]);
  }

  return endpoint;
};
