declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    ORIGIN: string;
    DATABASE_URL: string;
    SESSION_SECRET: string;
    API_KEY_STEAM: string;
    REDIRECT_URI: string;
  }
}