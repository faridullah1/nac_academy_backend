const path = require('path');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(helmet());

require('./startup/config')(app);
require('./startup/db')();
require('./startup/routes')(app);

module.exports = app;