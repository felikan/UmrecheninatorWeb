

async function Initialize() {    
    fetch("http://localhost:3000/api/getAll").then((res => res.json()))
        .then(data => {
            const tbodyRef = document.getElementById('output').getElementsByTagName('tbody')[0]
            console.log(data)
            const units = data;
            console.log(Array.isArray(units))
            units.map((unit, i) => {
                console.log(unit)
                const newRow = tbodyRef.insertRow()
                const newCell = newRow.insertCell()
                const newText = document.createTextNode(unit.unitName + ": ")
                newCell.appendChild(newText)
                const row = tbodyRef.rows[i]
                const valCell = row.insertCell()
                const valText = document.createTextNode("0")
                valCell.appendChild(valText)
                valCell.setAttribute("id", `unit${i}`)
                row.setAttribute("class", "OutputRow")
                });    
            })
    }
function Calc() {
    const path = "./units.json"
    fs.readFile(path, "utf-8", function (err, data) {
        const units = JSON.parse(data);        
        units.map((unit, i) => {
        const value = () => {
            switch (document.getElementById('unit').value) {
                case 'cm':
                  return (document.getElementById("value").value / 100) / unit.size;
                case 'm':
                  return (document.getElementById('value').value) / unit.size;
                case 'km':
                  return (document.getElementById('value').value * 1000) / unit.size;
            }
        };
        document.getElementById(`unit${i}`).innerHTML = value().toFixed(10)
        }
        );
    })
    if (document.getElementById("value").value == 420) {
        document.getElementById("audio").play()
    }
}

function AddUnit() {
    var newUnits = ""
    const path = "./units.json"
    fs.readFile(path, "utf-8", function (err, data) {
        newUnits = JSON.parse(data);
        const nameIn = document.getElementById("nameIn").value
        const sizeIn = (+document.getElementById("sizeIn").value)
        if (nameIn != "" && sizeIn != 0/* && JSON.stringify(newUnits).indexOf(nameIn) == -1*/) {
            newUnits = newUnits.concat({name: "in " + nameIn, size: sizeIn})
            console.log(newUnits)
            var write = JSON.stringify(newUnits)
            fs.writeFile(path, write, function(err, result) {
                if(err) console.log("error", err)
            })
            location.reload()
        }
    })
    const name = document.getElementById("nameIn").value
    if (name == "Perry" || name == "Schnabeltier" || name == "Perry, das Schnabeltier" || name == "Perry das Schnabeltier") {
        require('electron').shell.openExternal("https://www.youtube.com/watch?v=GLxpRH5mEEc");
    }
}

function Delete() {
    var DelUnits  = ""
    const path = "./units.json"
    fs.readFile(path, "utf-8", function (err, data) {
        DelUnits = JSON.parse(data);
        DelUnits = DelUnits.slice(0, DelUnits.length - 1)
        console.log(DelUnits)
        var write = JSON.stringify(DelUnits)
        fs.writeFile(path, write, function(err, result) {
            if(err) console.log("error", err)
        })
        location.reload()
        }    
)}

document.addEventListener("DOMContentLoaded", Initialize())
document.getElementById("enter").addEventListener("click", Calc)
document.getElementById("value").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("enter").click();
    }
})
document.getElementById("Test").addEventListener("click", AddUnit)
document.getElementById("Del").addEventListener("click", Delete)

