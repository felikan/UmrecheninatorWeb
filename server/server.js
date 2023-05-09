const {Configuration, OpenAIApi} = require("openai");
const isNumber = require("./helpers/isNumber")
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();


//OpenAI config
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);




//database
mongoose.connect(process.env.DB_URI);
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
const PORT = 3000 || process.env.PORT;
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
app.get("/shop", (req, res) => { res.sendFile(path.join(__dirname, "/../client/dist/DIE_SHOP_SEITE.html")); });

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

//OpenAI
app.get("/api/generate", async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(),
      temperature: 1,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
});

function generatePrompt() {
  return `Suggest further units of length like these ones with a size in meters. Never suggest anything than length. Only suggest the size in Meters. Do not suggest "Eiffelturm":
unitName: Ford Mondeos
unitSize: 4.456
unitName: Club Mate Flaschen
unitSize: 0.24
unitName: Samsung GU50AU7199UXZG LED-Fernseher
unitSize: 1.1168
unitName: Längen der Titanic
unitSize: 269
unitName: Längen des Nil
unitSize: 66930000
unitName: Erdumfängen am Äquator
unitSize: 40075017
unitName: 20cm Linealen
unitSize: 0.2
unitName: Sternburg Flaschen
unitSize: 0.27
unitName:`;
}
