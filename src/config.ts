const dotenv = require('dotenv');

dotenv.config({path: 'src/.env'});

module.exports = {
    app: {
        port: 3001
    }
}
