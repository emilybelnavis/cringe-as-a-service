import './tracer';
import { app } from './app';
import log from '@utils/log';
const config = require('@src/config');

let server = app.listen(config.app.port, () => {
    log.info(`API is now listening on port: ${config.app.port}`);
});

