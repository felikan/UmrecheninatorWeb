
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
                const newText = document.createTextNode(unit.unitName + ": ")
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
    
    units.map((unit,i) => {
        console.log(unit)
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
        
        document.getElementById(`${i}`).innerHTML = value().toFixed(10)
    })
}

function AddUnit() {

    if(!newUnitName.value.lengt ||!newUnitSize.value.length) return
    console.log(typeof newUnitName.value)
    units.push({unitName: newUnitName, unitSize: newUnitSize})
    console.log(newUnitName.value, newUnitSize.value)
            const newRow = tbodyRef.insertRow()
            const newCell = newRow.insertCell()
            const newText = document.createTextNode(newUnitName.value + ": ")
            newCell.appendChild(newText)
            const row = tbodyRef.rows[units.length -1]
            const valCell = row.insertCell()
            const valText = document.createTextNode("0")
            valCell.appendChild(valText)
            valCell.setAttribute("id", `unit${units.length -1}`)
            row.setAttribute("class", "OutputRow")
        
            // fetch('http://localhost:1020/api/insert', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(units),
            //   })
            //     .then((response) => response.json())
            //     .then((data) => {
            //       console.log('Success:', data);
            //     })
            //     .catch((error) => {
            //       console.error('Error:', error);
            //     });
}

function Delete() {
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

