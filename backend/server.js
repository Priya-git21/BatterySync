const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const getConnection = require('./utils/getConnection'); 

// .env files
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Define app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    const message = error.message || "Server Error";
    const statusCode = error.statusCode || 500;
    console.error(error.stack || error);
    res.status(statusCode).json({ message: message });
});

// Connecting to MongoDB
getConnection();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});