const PORT = require('../utils/const');
const express = require('express');
const path = require('path');

const app = express();
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});