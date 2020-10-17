const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./src/db');

const port = process.env.PORT || 8000;

const app = express();

db();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
