export function traceWrap(hostConfig: any): any {
  let traceWrappedHostConfig = {};
  Object.keys(hostConfig).map(key => {
    const func = hostConfig[key];
    traceWrappedHostConfig[key] = (...args: any[]) => {
      console.log(`[${key}]`);
      return func(...args);
    };
  });
  return traceWrappedHostConfig;
}

export const logInReconciler = process.env.LOG ? console.log : () => void 0;