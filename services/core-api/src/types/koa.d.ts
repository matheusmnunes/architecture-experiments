export {};

declare module 'koa' {
  interface DefaultState {
    input: {
      body?: unknown;
      params?: unknown;
      query?: unknown;
    };
  }
}
