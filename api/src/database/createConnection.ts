import { createConnection, Connection, ConnectionOptions } from 'typeorm';

import * as entities from 'entities';

const createDatabaseConnection = async (): Promise<Connection | undefined> => {
  try {
    const config: ConnectionOptions = {
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: Object.values(entities),
      synchronize: true,
    };
    const connection = await createConnection(config);

    if (!connection) {
      throw new Error(`Could not connect to database`);
    }

    return connection;
  } catch (error) {
    console.log(error);
  }
};

export default createDatabaseConnection;
