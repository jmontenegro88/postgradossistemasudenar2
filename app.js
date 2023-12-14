require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const environment = require("./environment");
const { sequelize } = require("./server/models/index");
require("./jobs");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(require("./server/routes/index"));
app.use(express.static(__dirname + "/server/static"));
app.use(express.static(__dirname + "/client/dist"));
app.get("*", (_req, res) =>
  res.sendFile(__dirname + "/client/dist/index.html")
);

if (environment.production) {
  app.disable("x-powered-by");
}

const port = process.env.PORT || 4500;
const host = process.env.HOST || "127.0.0.1";
sequelize
  .sync()
  .then(() => {
    app.listen(port, host, () => console.log(`Server started on port ${port}`));
  })
  .catch((err) => console.log(err));
