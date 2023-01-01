const mongoose = require('mongoose');

// Connection URL to MongoDB Atlas
const url = `mongodb+srv://pride:${process.env.MONGOPWD}@cluster0.gzf3lkz.mongodb.net/Pride0?retryWrites=true&w=majority`;

console.log(`MONGOPWD: ${process.env.MONGOPWD}`)

// Connection options for Mongoose
const connectionParams = {
  useNewUrlParser: true,
};

// Async function to connect to the database
const connectDB = async () => {
  mongoose.connect(url, connectionParams)
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((err) => {
      console.error(`Error connecting to the database.\n${err}`);
    });
};

// Export the connectDB function
module.exports = { connectDB };
