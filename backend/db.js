const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/"; // Update with your URI

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB successfully!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the process if connection fails
    }
  };
  
  module.exports = connectToMongo;