type TProcess = {
  PORT: string;
  HOST: string;
  CORS_ORIGIN: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  PASSWORD_SALT_ROUNDS: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
};

const {
  env: {
    PORT,
    HOST,
    CORS_ORIGIN,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    PASSWORD_SALT_ROUNDS,
    JWT_SECRET,
    JWT_EXPIRES_IN,
  },
} = process;

export const Process: TProcess = {
  PORT,
  HOST,
  CORS_ORIGIN,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  PASSWORD_SALT_ROUNDS,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
