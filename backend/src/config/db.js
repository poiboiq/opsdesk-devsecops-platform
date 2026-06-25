const mongoose = require("mongoose");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI is not configured. Backend will keep running but readiness will fail.");
    return;
  }

  let attempt = 0;

  while (true) {
    attempt += 1;

    try {
      await mongoose.connect(mongoUri);
      console.log("MongoDB connected");
      return;
    } catch (error) {
      console.error(`MongoDB connection failed on attempt ${attempt}: ${error.message}`);
      await sleep(5000);
    }
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error(`MongoDB error: ${error.message}`);
});

module.exports = connectDB;
