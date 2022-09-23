const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();

const routes = require('./routes/index');

app.use(express.static(path.join(__dirname, './home.html')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
});
