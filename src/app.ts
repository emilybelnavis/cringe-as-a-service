import express from 'express';
import limit from 'express-rate-limit';
import log from '@utils/log';
const slash = require('express-trailing-slash');
const StatsD = require('hot-shots');
const config = require('@src/config');
//import "@src/tracer ";

const app = express();

const dogstatsd = new StatsD({
    errorHandler: function(error: Error) {
        log.error(`Socket errors were caught here: ${error}`)
    }
});

app.use(slash());

app.use( limit({
    message: { status: 429, message: "API rate limit has been reached."},
    windowMs: 60*1000,
    max: 1000
    })
);

app.use((req: any, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Forwarded-For, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.set('Cache-control', 'public, max-age=300, stale-if-error=5');
    log.info(`[Client: ${req.headers['x-forwarded-for'] || req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
    dogstatsd.increment('page.views');
    next();
});

app.set('trust proxy', '127.0.0.1');
app.enable('strict routing');

export { app }

