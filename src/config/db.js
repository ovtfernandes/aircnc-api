const mongoose = require('mongoose');

let database;

try {
    const config = require('./db.json');
    database = config.database;
}
catch {
    database = {
        dbClusterUrl: process.env.DB_CLUSTER_URL,
        dbName: process.env.DB_NAME,
        dbPassword: process.env.DB_PASSWORD,
        dbUsername: process.env.DB_USERNAME,
    };
}

const {
    dbClusterUrl,
    dbName,
    dbPassword,
    dbUsername,
} = database;

const isSrv = dbName && dbPassword;
const dbURL = isSrv
    ? `${dbUsername}:${dbPassword}@${dbClusterUrl}`
    : dbClusterUrl;

const mongooseConnectionString = `mongodb${isSrv ? '+srv' : ''}://${dbURL}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;