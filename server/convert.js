
var units = []
const tbodyRef = document.getElementById('output').getElementsByTagName('tbody')[0]
const newUnitSize = document.getElementById("sizeIn")
const newUnitName =  document.getElementById("nameIn")
const inputSize =  document.getElementById("value")

async function Initialize() {    
        fetch("http://localhost:1020/api/getAll").then((res => res.json()))
        .then(data => {

            units = data;
            units.map((unit, i) => {

                const newRow = tbodyRef.insertRow()
                const newCell = newRow.insertCell()
                const newText = document.createTextNode("in "+unit.unitName + ": ")
                newCell.appendChild(newText)
                const row = tbodyRef.rows[i]
                const valCell = row.insertCell()
                const valText = document.createTextNode("0")
                valCell.appendChild(valText)
                valCell.setAttribute("id", `${i}`)
                row.setAttribute("class", "OutputRow")
                });    
            })
    }
function Calc() {
    const MikrowellenAktiervierungsIdentifiktitierungsNummer = 420
    if(!inputSize.value.length) return
    if (document.getElementById("value").value == MikrowellenAktiervierungsIdentifiktitierungsNummer) {
        document.getElementById("audio").play()
    }
    console.log(units, "hier")
    units.map((unit,i) => {
        const value = () => {
            switch (document.getElementById('unit').value) {
                case 'cm':
                  return (document.getElementById("value").value / 100) / unit.unitSize;
                case 'm':
                  return (document.getElementById('value').value) / unit.unitSize;
                case 'km':
                  return (document.getElementById('value').value * 1000) / unit.unitSize;
            }
        };
    
        console.log( document.getElementById(`${i}`) )
        document.getElementById(`${i}`).innerHTML = value().toFixed(10)
    })
}

function AddUnit() {
    if(!newUnitName.value.length ||!newUnitSize.value.length) return
    var isExisting = false
    units.map((unit,i) => {
        if(unit.unitName === newUnitName.value){
            console.log(unit.unitName, newUnitName.value)
            units.unitSize = parseFloat(newUnitSize.value)
            isExisting = true
        }
    
        })

        if(!isExisting){
            units.push({unitName: newUnitName.value, unitSize: parseFloat(newUnitSize.value)})
            console.log("hi")
            const newRow = tbodyRef.insertRow()
            const newCell = newRow.insertCell()
            const newText = document.createTextNode("in " + newUnitName.value + ": ")
            newCell.appendChild(newText)
            const row = tbodyRef.rows[units.length -1]
            const valCell = row.insertCell()
            const valText = document.createTextNode("0")
            valCell.appendChild(valText)
            valCell.setAttribute("id", `${units.length -1}`)
            row.setAttribute("class", "OutputRow")
            
        }

        
        console.log("client-units", units)
        fetch('http://localhost:1020/api/insert', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({unitName: "1212", unitSize: 100}),
            mode: "no-cors"
    
          })
            .then((res) => res.json())
            .then((units) => {
              console.log('Success:', units);
            })
            .catch((error) => {
              console.error('Error:', error);
            });

    }     

    

function Delete() {
    units.pop()
    console.log(units)
    if(tbodyRef.rows.length <= 9) return
    // fetch("http://localhost:1020/api/del").then((res => res.json()))
    tbodyRef.deleteRow(tbodyRef.rows.length -1)
         }

document.addEventListener("DOMContentLoaded", Initialize())
document.getElementById("enter").addEventListener("click", Calc)
document.getElementById("value").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Calc()
    }
})
document.getElementById("Test").addEventListener("click", AddUnit)
document.getElementById("Del").addEventListener("click", Delete)
document.getElementById("unit").addEventListener("change", Calc)

