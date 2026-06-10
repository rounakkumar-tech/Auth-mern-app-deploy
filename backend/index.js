const express = require('express');
const app = express();
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouters');

require('dotenv').config();
const connectDB = require('./Models/db');

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use(express.json());
app.use(cors());
app.use('/auth', AuthRouter);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();