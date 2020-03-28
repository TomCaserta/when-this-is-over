import mongoose from 'mongoose';
import consola from 'consola';
import express, { Express } from 'express';
import config from 'config';
import cors from 'cors';

import { router } from '~/router';

export const application = async (): Promise<Express> => {
  const abort = (message: string): never => {
    consola.fatal({ message, badge: true });
    return process.exit(1);
  };

  if (!config.has('auth.secret') || !config.get('auth.secret')) {
    abort('No key for encryption found');
  }

  const connection = {
    url: config.get('db.mongo.url') as string,
    options: {
      user: config.get('db.mongo.user') as string,
      pass: config.get('db.mongo.pass') as string
    }
  };

  return await mongoose.connect(connection.url, { ...connection.options, useNewUrlParser: true })
    .then(() => {
      const app = express();

      // TODO: Specify specific origins for CORS requests.
      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(router);

      return app;
    })
    .catch((e) => {
      return abort('Could not connect to MongoDB');
    });
};
