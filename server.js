const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5152;

app.listen(port, () => {
  console.log(`Application started on: localhost:${port}`);
});

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/students", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body);
});