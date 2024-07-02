declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REDIS_URL: string;
      PORT: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
      IOLX_API_PASSWORD: string;
      IOLX_API_CODE: string;
      STRIPE_SECRET_KEY: string;
    }
  }
}

export {}
