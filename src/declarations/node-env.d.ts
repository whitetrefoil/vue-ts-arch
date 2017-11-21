declare namespace NodeJS {
  export interface Process {
    env: any|{
      API_PREFIX: string,
      BABEL_ENV: string,
      NODE_ENV: string,
      VUE_ROUTER_BASE: string,
    },
  }
}
