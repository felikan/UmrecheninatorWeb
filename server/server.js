const isNumber = require("./helpers/isNumber");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { WebSocketServer } = require("ws");
const http = require("http");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

dotenv.config();

//database
mongoose.connect(process.env.DB_URL);
const database = mongoose.connection;
const Model = require("./models/model");

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

//WsServer
let messages = [];
wsServer.on("connection", function (connection) {
  console.log(`Recieved a new connection.`);
  connection.send(
    JSON.stringify({
      type: "allMessages",
      body: messages,
    })
  );

  connection.on("message", (message) => {
    messages.push(message.toString());
    wsServer.broadcast(message.toString());
  });
  connection.on("close", () => {
    console.log("Connection closed");
  });
});

wsServer.broadcast = function broadcast(msg) {
  wsServer.clients.forEach(function each(client) {
    client.send(
      JSON.stringify({
        type: "newMessage",
        body: msg,
      })
    );
  });
};

//server
const app = express();
const PORT = 8080 || process.env.PORT;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cors());
//app.use('/api', routes);
app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("hi");
});
app.get("/api/getAll", async (req, res) => {
  try {
    const units = await Model.find();

    const unitsFormat = [];

    units.map((unit) => {
      unitsFormat.push({ unitName: unit.unitName, unitSize: unit.unitSize });
    });

    res.json(units);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/insert", async (req, res) => {
  if (!isNumber(req.body.newInputSizeRef)) return;
  const newUnit = new Model({
    unitName: req.body.newInputUnitRef,
    unitSize: req.body.newInputSizeRef,
  });

  const foundUnit = await Model.findOne({
    unitName: req.body.newInputUnitRef,
    unitSize: req.body.newInputSizeRef,
  }).exec();
  if (foundUnit) return;
  const foundUnitName = await Model.findOne({
    unitName: req.body.newInputUnitRef,
  }).exec();

  try {
    if (foundUnitName) {
      const unitToUpdate = await Model.findOneAndUpdate(
        { unitName: req.body.newInputUnitRef },
        { unitSize: req.body.newInputSizeRef },
        { new: true }
      );
      res.status(200).json(unitToUpdate);
    } else {
      const unitToAdd = await newUnit.save();
      res.status(200).json(unitToAdd);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/del/:id", async (req, res) => {
  const units = await Model.find();

  const val = await Model.findById(req.params.id).exec();

  if (val === null || !units[units.length - 1]._id.equals(val._id)) return;

  try {
    if (units.length > 8) {
      const unitToDel = await Model.deleteOne(units[units.length - 1]);
      res.status(200).json(unitToDel);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
