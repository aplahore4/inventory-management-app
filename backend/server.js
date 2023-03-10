const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const path = require('path');

const { PORT, MONGO_URL } = require('./config');
const { upload } = require('./utils/uploadFile');

const app = express();

// Connect to DB and start server
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running at port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('uploads', express.static(path.join(__dirname, 'uploads')));

//Routes Middle wares
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

// Routes
app.get('/', (req, res) => {
  res.send('Home Page...');
});

// Error middleware
app.use(errorHandler);
