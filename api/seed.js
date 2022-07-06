const mongoose = require("mongoose");
const { User, Post, Comment } = require("./models");

require('dotenv').config();
const { KEY } = process.env;

mongoose.connect((process.env.KEY), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// on open connection, query against mongodb
db.once("open", async function () {
  try {
    // create instance based on model
    const bodie = new User({ name: { first: "Cacho", last: "Almendra" } });
    // save instance
    await bodie.save();

    // another user
    const doyle = new User({ name: { first: "Tito", last: "Tessone" } });
    await doyle.save();

    // a post by user (bodie)
    const devPostByBodie = new Post({
      title: "Example Express.js Server",
      body:
        "Express is Fast, minimalist web framework for Node.js",
      user: bodie,
    });
    await devPostByBodie.save();

    // add the post to user.posts so it can be referenced
    bodie.posts.push(devPostByBodie);
    await bodie.save();

    // a comment by user (doyle)
    const doyleComment = new Comment({
      title: "nice post!",
      user: doyle,
    });
    devPostByBodie.comments.push(doyleComment);
    await devPostByBodie.save();

    // another comment by user (bodie)
    const bodieComment = new Comment({
      title: "thanks",
      user: bodie,
    });
    devPostByBodie.comments.push(bodieComment);
    await devPostByBodie.save();

    // find users
    const users = await User.find().populate("posts");
    console.log(users);

    // find posts
    const posts = await Post.find().populate("user");
    console.log(posts);

    db.close();
  } catch (error) {
    console.log(error);
    db.close();
  }
});
