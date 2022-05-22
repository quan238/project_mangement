import * as authentication from 'controllers/authentication';
import * as comments from 'controllers/comments';
import * as issues from 'controllers/issues';
import * as projects from 'controllers/projects';
import * as test from 'controllers/test';
import * as users from 'controllers/users';

export const attachPublicRoutes = (app: any): void => {
  if (process.env.NODE_ENV === 'test') {
    app.delete('/test/reset-database', test.resetDatabase);
    app.post('/test/create-account', test.createAccount);
  }

  /**
   * @swagger
   * /authentication/guest:
   *  tags:
   *    - Auth
   *  post:
   *    description: Use to authenticate guest user
   *    produces:
   *      - application/json
   *    responses:
   *      200: Success
   */
  app.post('/authentication/guest', authentication.createGuestAccount);
};

export const attachPrivateRoutes = (app: any): void => {
  app.post('/comments', comments.create);
  app.put('/comments/:commentId', comments.update);
  app.delete('/comments/:commentId', comments.remove);

  /**
   * @swagger
   * /issues:
   *  get:
   *    operationId: getIssues
   *    summary: Get issues
   *    description: Get issues
   *    tags:
   *      - Issue
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      200:
   *        description: OK
   *        content:
   *          'application/json':
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Issue'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  app.get('/issues', issues.getProjectIssues);
  app.get('/issues/:issueId', issues.getIssueWithUsersAndComments);
  app.post('/issues', issues.create);
  app.put('/issues/:issueId', issues.update);

  app.delete('/issues/:issueId', issues.remove);

  app.get('/project', projects.getProjectWithUsersAndIssues);
  app.put('/project', projects.update);

  app.get('/currentUser', users.getCurrentUser);
};
