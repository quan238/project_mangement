import createDatabaseConnection from 'database/createConnection';
import { User, Comment, Issue, Project } from 'entities';
import { Connection } from 'typeorm';
import { createEntity } from 'utils/typeorm';

export const seed = async (connection: Connection) => {
  await connection.transaction(async transactionalEntityManager => {
    await transactionalEntityManager.delete(User, {});
    await transactionalEntityManager.delete(Comment, {});
    await transactionalEntityManager.delete(Issue, {});
    await transactionalEntityManager.delete(Project, {});
    // const users = await seedUsers();
    // const project = await seedProject(users);
    // const issues = await seedIssues(project);
    // await seedComments(issues, project.users);

    const user = createEntity(User, {
      email: 'rick@jira.guest',
      name: 'Pickle Rick',
      avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    });
    await transactionalEntityManager.save(user);
  });
};

const main = async () => {
  const connection = await createDatabaseConnection();
  if (connection) {
    await seed(connection);
    await connection.close();
  }
  return;
};

main();
