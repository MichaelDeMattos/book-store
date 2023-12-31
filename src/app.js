const express = require("express");
const logger = require('./logger');
const books_api = require("./api/BooksApi");
const bodyParser = require('body-parser');
const sequelize = require('./config');

// Config Express App
const app = express();
const instance_port = process.env.INSTANCE_PORT;
const instance_host = process.env.INSTANCE_HOST;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Custom middleware to log URL routing
app.use((req, res, next) => {
    logger.info(`[${new Date().toLocaleString()}] ${instance_host}:${instance_port} | ${req.method} ${req.url}`);
    next();
});

// Register api's
app.use(books_api);

// Custom middleware for handling 404 errors
app.use((req, res) => {
    res.status(404).send('Not found!!!')
});

// Sync database
if (process.env.INSTANCE == 'main') {
    sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    }).catch((err) => {
        console.error('Error syncing the database:', err);
});
}

// Export default app
app.listen(instance_port, instance_host, () => {
    logger.info(`Express server is now listenng on ${instance_host}:${instance_port}`)
});
