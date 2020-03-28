import dotenv from 'dotenv';
import consola from 'consola';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '.env'), debug: true });

async function main () {
    // Load config after dotenv has been configured.
    const config = require('config');
    const { application } = await import('~/app');

    application()
        .then(async app => {
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
        });
}

main();
