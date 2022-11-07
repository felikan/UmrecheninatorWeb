import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../styles/App.css'
import NavMain from "./Nav/NavMain";
import BodyMain from "./Body/BodyMain";
import FooterMain from "./Footer/FooterMain";

function App() {
    const [allUnits, setAllUnits] =  useState<{ unitName: string; unitSize: number }[]>
    ([{unitName:"in Ford Mondeos",unitSize:4.456},
        {unitName:"in Club Mate Flaschen",unitSize:0.24},
        {unitName:"in Samsung GU50AU7199UXZG LED-Fernseher",unitSize:1.1168},
        {unitName:"in Längen der Titanic",unitSize:269},
        {unitName:"in Längen des Nil",unitSize:6693000},
        {unitName:"in Erdumfängen am Äquator",unitSize:40075017},
        {unitName:"in 20cm Linealen",unitSize:0.2},
        {unitName:"in Sternburg Flaschen",unitSize:0.27},
        {unitName:"in Elon Musks",unitSize:1.88}])

    console.log(allUnits)
  return (
      <>
      <NavMain/>
      <BodyMain allUnits={allUnits}/>
  <FooterMain/>
      </>
  )
}

export default App
