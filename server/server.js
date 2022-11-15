const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path");
const mongoString =
  "mongodb+srv://Umrecheninator:AXD1UnkGacxcPC9T@umrecheninator.ftcsi2x.mongodb.net/umrecheninatorUnits";

//database
mongoose.connect(mongoString);
const database = mongoose.connection;
const Model = require("./models/model");

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

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
  res.sendFile(path.join(__dirname, "/../client/dist/index.html"));
});
app.get("/api/getAll", async (req, res) => {
  console.log("gette");
  try {
    const units = await Model.find();

    const unitsFormat = [];

    units.map((unit) => {
      unitsFormat.push({ unitName: unit.unitName, unitSize: unit.unitSize });
    });

    res.json(unitsFormat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/insert", async (req, res) => {
  console.log(req.body.newInputSizeRef);
  const unit = new Model({
    unitName: req.body.newInputUnitRef,
    unitSize: req.body.newInputSizeRef,
  });

  const units = await Model.find();

  const unitsFormat = [];

  units.map((unit) => {
    unitsFormat.push({ unitName: unit.unitName, unitSize: unit.unitSize });
  });

  console.log(unitsFormat);

  try {
    const unitToAdd = await unit.save();
    res.status(200).json(unitToAdd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/del", async (req, res) => {
  const unit = new Model({
    unitName: req.body.unitName,
    unitSize: req.body.unitSize,
  });

  const units = await Model.find();

  const unitsFormat = [];

  units.map((unit) => {
    unitsFormat.push({ unitName: unit.unitName, unitSize: unit.unitSize });
  });

  console.log(units);

  try {
    await unit.deleteOne(unitsFormat[unitsFormat.length - 1]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
