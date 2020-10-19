require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./src/db');
const agentRouter = require('./src/routes/agent');
const contactRouter = require('./src/routes/contact');
const userRouter = require('./src/routes/user');

const port = process.env.PORT || 8000;

const app = express();

db();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/agents', agentRouter);
app.use('/contacts', contactRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
