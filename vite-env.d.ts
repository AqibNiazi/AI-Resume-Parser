declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly API_KEY: string;
      [key: string]: string | undefined;
    }
  }
}

declare var process: {
  env: NodeJS.ProcessEnv;
};
