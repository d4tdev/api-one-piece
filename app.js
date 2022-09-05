const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const routes = require('./routes/index');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
});
