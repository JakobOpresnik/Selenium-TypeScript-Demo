declare namespace NodeJS {
  interface ProcessEnv {
    BROWSER_ENV: 'true' | 'false';
    BROWSER_NAME: 'chrome' | 'firefox';
  }
}
