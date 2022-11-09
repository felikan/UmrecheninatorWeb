import { useEffect, useRef, useState } from "react";
import "../styles/App.css";
import NavMain from "./Nav/NavMain";
import BodyMain from "./Body/BodyMain";
import FooterMain from "./Footer/FooterMain";
import axios from "axios";

function App() {
  const inputValueRef = useRef<HTMLInputElement>(null);
  const newInputUnitRef = useRef<HTMLInputElement>(null);
  const newInputSizeRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<any>(null);
  const [allUnits, setAllUnits] = useState<
    { unitName: string; unitSize: number }[]
  >([
    { unitName: "Ford Mondeos", unitSize: 4.456 },
    { unitName: "Club Mate Flaschen", unitSize: 0.24 },
    { unitName: "Samsung GU50AU7199UXZG LED-Fernseher", unitSize: 1.1168 },
    { unitName: "Längen der Titanic", unitSize: 269 },
    { unitName: "Längen des Nil", unitSize: 6693000 },
    { unitName: "Erdumfängen am Äquator", unitSize: 40075017 },
    { unitName: "20cm Linealen", unitSize: 0.2 },
    { unitName: "Sternburg Flaschen", unitSize: 0.27 },
    { unitName: "Elon Musks", unitSize: 1.88 },
  ]);

  const [inputValue, setInputValue] = useState<number>(0);
  const [optionActive, setOptionActive] = useState<number>(1);
  const [backendData, setBackendData] = useState<
    { unitName: string; unitSize: number }[]
  >([]);
  const [inputValueUnitOptions, setInputValueUnitOptions] = useState<
    { value: number; label: string }[]
  >([
    { value: 1000, label: "km" },
    { value: 1, label: "m" },
    { value: 0.01, label: "cm" },
  ]);

  useEffect(() => {
    // fetch("http://localhost:1024/api/getAll").then((res => res.json())).then(data => {setBackendData(data)})

    axios.get("http://localhost:1024/api/getAll").then((res) => {
      setBackendData(res.data);
    });
    console.log("hey");
  }, []);

  const onSubmitNewInput = () => {
    axios
      .post("http://localhost:1024/api/insert", {
        newInputUnitRef: newInputUnitRef,
        newInputSizeRef: newInputSizeRef,
      })
      .then(() => {
        console.log("success insert");
      });
  };

  const onErleuchtinierung = () => {
    console.log(backendData);
    if (inputValueRef.current === null) return;
    if (inputValueRef.current.value.length === 0) return;
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
    if (
      newInputUnitRef.current.value.length === 0 ||
      newInputSizeRef.current.value.length === 0
    )
      return;
    const newArray = [...allUnits];
    var isDuplicate = false;
    allUnits.map((e) => {
      if (
        e.unitName === newInputUnitRef.current.value &&
        e.unitSize === parseFloat(newInputSizeRef.current.value)
      )
        return;
    });
    newArray.map((e, i) => {
      if (e.unitName === newInputUnitRef.current.value) {
        newArray[i] = {
          unitName: newInputUnitRef.current.value,
          unitSize: parseFloat(newInputSizeRef.current.value),
        };
        setAllUnits(newArray);
        isDuplicate = true;
      }
    });
    if (isDuplicate) return;
    setAllUnits((prevState) => [
      ...prevState,
      {
        unitName: newInputUnitRef.current.value,
        unitSize: parseFloat(newInputSizeRef.current.value),
      },
    ]);
    onSubmitNewInput();
  };

  const onLöschinieren = () => {
    const defaultAllUnitsLength = 9;
    if (allUnits.length === defaultAllUnitsLength) return;
    setAllUnits((prevState) => prevState.slice(0, -1));
  };
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
      <FooterMain
        newInputUnitRef={newInputUnitRef}
        newInputSizeRef={newInputSizeRef}
        onHinzufüginierung={onHinzufüginierung}
        onLöschinieren={onLöschinieren}
      />
    </>
  );
}

export default App;
