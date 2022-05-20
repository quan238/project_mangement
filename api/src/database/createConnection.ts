import { createConnection, Connection } from 'typeorm';

import * as entities from 'entities';

const createDatabaseConnection = async (): Promise<Connection | undefined> => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: Object.values(entities),
      synchronize: true,
    });

    if (!connection) {
      throw new Error(`Could not connect to database`);
    }

    return connection;
  } catch (error) {
    console.log(error);
  }
};

export default createDatabaseConnection;
