const mongoose = require("mongoose");
const { Comment } = require("./Comment");

require('dotenv').config();
const {KEY} = process.env;

  mongoose.connect((process.env.KEY), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = {
  User: require("./User"),
  Post: require("./Post"),
  Comment,
};
