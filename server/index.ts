import dotenv from 'dotenv';
import config from 'config';
import consola from 'consola';
import { app } from '~/app';

dotenv.config();

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
