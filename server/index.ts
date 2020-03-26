import dotenv from 'dotenv';
import config from 'config';
import consola from 'consola';
import mongoose from "mongoose";
import { app } from '~/app';

dotenv.config();

const destroyServer = (message: string) => {
  consola.fatal({
    message,
    badge: true
  });
  process.exit(1);
};

if (!config.get('auth.secret')) {
  destroyServer('No primary key for encryption found');
}

const connection = {
  url: config.get('db.mongo.url') as string,
  user: config.get('db.mongo.user') as string,
  pass: config.get('db.mongo.pass') as string
};

mongoose.connect(connection.url, { useNewUrlParser: true })
  
  .then(() => {
    const host = (config.get('server.host') as string) || 'localhost';
    const port = (config.get('server.port') as number) || 3000;

    app.set('host', host);
    app.set('port', port);

    app.listen(port, host, () => {
      consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
      });
    });
  })
  
  .catch(error => {
    destroyServer('Could not connect to MongoDB')
  });
