const express = require("express");
const animeback_submit = require("@taistudio/animeback-submit");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(animeback_submit);
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
