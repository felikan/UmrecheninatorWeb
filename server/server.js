const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser")
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
const PORT = 1026
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
        units.map(unit => {
            unit._id = "jo passt mh"
            delete unit.__v
        })
        
        console.log(units, "---")
        res.json(units)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})
app.post("/test", async (req, res) => {
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