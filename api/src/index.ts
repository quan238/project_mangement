import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import createDatabaseConnection from 'database/createConnection';
import { addRespondToResponse } from 'middleware/response';
import { authenticateUser } from 'middleware/authentication';
import { handleError } from 'middleware/errors';
import { RouteNotFoundError } from 'errors';
import { attachPublicRoutes, attachPrivateRoutes } from './routes';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
const establishDatabaseConnection = async (): Promise<void> => {
  try {
    await createDatabaseConnection();
  } catch (error) {
    console.log(error);
  }
};
const options: swaggerJsdoc.Options = {
  customCss:
    'wagger-ui .opblock-description-wrapper p,.swagger-ui .opblock-external-docs-wrapper p,.swagger-ui .opblock-title_normal p{font-size:14px;margin-bottom:10px;font-family:Open Sans,sans-serif;color:#3b4151}',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Management API',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    schemes: ['http', 'https'],
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Optional server description, e.g. Integrate (development) server',
      },
    ],
    components: {
      securitySchemes: {
        BasicAuth: { type: 'http', scheme: 'basic' },
        bearerAuth: { type: 'http', scheme: 'bearer' },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['**/*.ts'],
};

const specs = swaggerJsdoc(options);
const initializeExpress = (): void => {
  const app = express();

  app.use(cors({ credentials: true, origin: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(addRespondToResponse);

  if (process.env.NODE_ENV !== 'production') {
    app.use(
      morgan('common', {
        stream: fs.createWriteStream('./log/access.log', {
          flags: 'a',
        }),
      }),
    );
    app.use(morgan('dev'));
  }

  // 3. Cookie Parser
  app.use(cookieParser());

  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customCss: 'p{margin:0!important}',
      explorer: true,
    }),
  );

  attachPublicRoutes(app);
  app.use('/', authenticateUser);
  attachPrivateRoutes(app);

  app.use((req: { originalUrl: string }, _res: any, next: (arg0: RouteNotFoundError) => any) =>
    next(new RouteNotFoundError(req.originalUrl)),
  );
  app.use(handleError);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
    console.log(`⚡️[server]: Docs is running at http://localhost:${process.env.PORT}/docs`);
  });
};

const initializeApp = async (): Promise<void> => {
  try {
    await establishDatabaseConnection();
    initializeExpress();
  } catch (err) {
    console.log(err);
  }
};

(async (): Promise<void> => {
  await initializeApp();
})();
