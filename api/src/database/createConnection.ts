import { Comment, Issue, Project, User } from 'entities';
import { createConnection, Connection } from 'typeorm';

const createDatabaseConnection = async (): Promise<Connection | undefined> => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Comment, Issue, Project, User],
      synchronize: true,
    });

    console.log(connection.isConnected);

    if (!connection) {
      throw new Error(`Could not connect to database`);
    }

    return connection;
  } catch (error) {
    console.log(error);
  }
};

export default createDatabaseConnection;
