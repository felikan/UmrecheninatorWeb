import { useRef, useState } from "react";
import "../styles/App.css";
import NavMain from "./Nav/NavMain";
import BodyMain from "./Body/BodyMain";
import FooterMain from "./Footer/FooterMain";

function App() {
  const inputValueRef = useRef<HTMLInputElement>(null);
  const newInputUnitRef = useRef<HTMLInputElement>(null);
  const newInputSizeRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<any>(null);
  const [allUnits, setAllUnits] = useState<
    { unitName: string; unitSize: number }[]
  >([
    { unitName: "in Ford Mondeos", unitSize: 4.456 },
    { unitName: "in Club Mate Flaschen", unitSize: 0.24 },
    { unitName: "in Samsung GU50AU7199UXZG LED-Fernseher", unitSize: 1.1168 },
    { unitName: "in Längen der Titanic", unitSize: 269 },
    { unitName: "in Längen des Nil", unitSize: 6693000 },
    { unitName: "in Erdumfängen am Äquator", unitSize: 40075017 },
    { unitName: "in 20cm Linealen", unitSize: 0.2 },
    { unitName: "in Sternburg Flaschen", unitSize: 0.27 },
    { unitName: "in Elon Musks", unitSize: 1.88 },
  ]);

  const [inputValue, setInputValue] = useState<number>(0);
  const [optionActive, setOptionActive] = useState<number>(1);
  const [inputValueUnitOptions, setInputValueUnitOptions] = useState<
    { value: number; label: string }[]
  >([
    { value: 1000, label: "km" },
    { value: 1, label: "m" },
    { value: 0.01, label: "cm" },
  ]);

  const onErleuchtinierung = () => {
    if (inputValueRef.current === null) return;
    setInputValue(parseFloat(inputValueRef.current.value));
  };

  const onSelectChange = (e: any) => {
    inputValueUnitOptions.map((element, i) => {
      if (element.value === e.value) {
        setOptionActive(inputValueUnitOptions[i].value);
      }
    });
  };

  const onHinzufüginierung = () => {
    if (newInputUnitRef.current === null) return;
    if (newInputSizeRef.current === null) return;
    const newArray = [...allUnits]
    var isDuplicate = false
    allUnits.map((e) => {
      if (e.unitName === newInputUnitRef.current.value && e.unitSize === parseFloat(newInputSizeRef.current.value)) return
    })
       newArray.map((e,i) =>{
        if (e.unitName === newInputUnitRef.current.value){
          newArray[i] = {unitName: newInputUnitRef.current.value, unitSize: parseFloat(newInputSizeRef.current.value)}
          setAllUnits(newArray)
          isDuplicate = true
        }
      })
    if(isDuplicate) return
    setAllUnits(prevState => [...prevState, {
      unitName: newInputUnitRef.current.value,
      unitSize: parseFloat(newInputSizeRef.current.value)
    }])

  }

  const onLöschinieren = () => {
    setAllUnits((prevState) => (prevState.slice(0, -1)));
  }
  return (
    <>
      <NavMain
        inputValueRef={inputValueRef}
        onErleuchtinierung={onErleuchtinierung}
        onSelectChange={onSelectChange}
        inputValueUnitOptions={inputValueUnitOptions}
        selectRef={selectRef}
      />
      <BodyMain
        allUnits={allUnits}
        optionActive={optionActive}
        inputValue={inputValue}
        inputValueUnitOptions={inputValueUnitOptions}
      />
      <FooterMain newInputUnitRef={newInputUnitRef} newInputSizeRef={newInputSizeRef} onHinzufüginierung={onHinzufüginierung} onLöschinieren={onLöschinieren}/>
    </>
  );
}

export default App;
