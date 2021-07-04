const express = require('express');

const { dogRouter } = require('./routes');
const { port } = require('./constants');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dog', dogRouter);

app.listen(port.PORT, () => {
  console.log(`App listen ${port.PORT}`);
});
