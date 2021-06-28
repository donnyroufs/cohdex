declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    PORT: number
    ORIGIN: string
    DATABASE_URL: string
    SESSION_SECRET: string
    API_KEY_STEAM: string
    REDIRECT_URI: string
    CALLBACK_URI: string
    BASE_URI: string
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
  }
}
