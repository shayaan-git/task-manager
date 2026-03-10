const mongoose = require("mongoose");

const connectToDb = function () {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB Database");
  });
};

module.exports = connectToDb;
