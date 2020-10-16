const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
