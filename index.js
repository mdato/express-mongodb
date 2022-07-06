const express = require("express");
const app = express();
const product = require("./api/product");

//const app = require("./src/app");
const PORT = 3000;

app.use(express.json({ extended: false }));

app.use("/api/product", product);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server started on port: ${PORT}`);
});
