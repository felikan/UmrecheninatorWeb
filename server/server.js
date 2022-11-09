const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser")
var cors = require('cors')
const mongoString = "mongodb+srv://Umrecheninator:AXD1UnkGacxcPC9T@umrecheninator.ftcsi2x.mongodb.net/umrecheninatorUnits";

//database
mongoose.connect(mongoString);
const database = mongoose.connection;
const Model = require("./models/model")

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

//server
const app = express();
const PORT = 1024 || process.env.PORT
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
//app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Server at ${PORT}`);
})
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.get("/api/getAll", async (req, res) => {
    try {
        const units = await Model.find();

        const unitsFormat = []

        units.map(unit => {
            unitsFormat.push({unitName: unit.unitName, unitSize: unit.unitSize})
        })

        console.log(unitsFormat, "---")
        res.json(unitsFormat)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})
app.post("/api/insert", async (req, res) => {
        const unit = new Model({
        unitName: req.body.unitName,
        unitSize: req.body.unitSize
    })
    
    try {
        const unitToAdd = await unit.save();
        res.status(200).json(unitToAdd);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})