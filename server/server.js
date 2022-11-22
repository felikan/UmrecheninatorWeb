const isNumber = require("./helpers/isNumber")
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
