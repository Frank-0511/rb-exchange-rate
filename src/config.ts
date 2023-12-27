import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
    },
    mysql: {
      dbName: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_PORT, 10),
      password: process.env.MYSQL_ROOT_PASSWORD,
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
    },
    apiKey: process.env.API_KEY,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  };
});
