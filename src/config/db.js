const mongoose = require('mongoose');

const dbClusterUrl = process.env.DB_CLUSTER_URL;
const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUsername = process.env.DB_USERNAME;

const isSrv = dbUsername && dbPassword;
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
