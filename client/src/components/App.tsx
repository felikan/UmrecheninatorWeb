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
  >([]);

  const [inputValue, setInputValue] = useState<number>(0);
  const [optionActive, setOptionActive] = useState<number>(1);

  const [inputValueUnitOptions, setInputValueUnitOptions] = useState<
    { value: number; label: string }[]
  >([
    { value: 1000, label: "km" },
    { value: 1, label: "m" },
    { value: 0.01, label: "cm" },
  ]);

  useEffect(() => {
    // fetch("http://localhost:1024/api/getAll").then((res => res.json())).then(data => {setBackendData(data)})

    axios.get("http://localhost:8080/api/getAll").then((res) => {
      setAllUnits(res.data);
    });
    console.log("hey");
  }, []);

  const onSubmitNewInput = () => {
    const post = {
      newInputUnitRef: newInputUnitRef.current!.value,
      newInputSizeRef: newInputSizeRef.current!.value,
    };
    axios.post("http://localhost:8080/api/insert", post).then(() => {
      console.log("success insert");
    });
  };

  const onErleuchtinierung = () => {
    const MikrowellenAktivinierungsNummer = "420";
    if (inputValueRef.current === null) return;
    if (inputValueRef.current.value.length === 0) return;
    if (inputValueRef.current.value === MikrowellenAktivinierungsNummer) {
      let audio = new Audio("/Microwave.mp3");
      audio.play();
    }

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
    const PatrickAktivinierungsZeichenkette = "Patrick";
    if (newInputUnitRef.current === null) return;
    if (newInputSizeRef.current === null) return;

    if (
      newInputUnitRef.current.value.length === 0 ||
      newInputSizeRef.current.value.length === 0
    )
      return;

    if (
      newInputUnitRef.current.value.length === 0 ||
      newInputSizeRef.current.value.length === 0
    )
      return;
    if (newInputUnitRef.current.value === PatrickAktivinierungsZeichenkette) {
      let audio = new Audio("/dududu.mp3");
      audio.play();
    }
    const newArray = [...allUnits];
    var isDuplicate = false;

    allUnits.map((e) => {
      if (
        e.unitName === newInputUnitRef.current!.value &&
        e.unitSize === parseFloat(newInputSizeRef.current!.value)
      )
        return;
    });
    newArray.map((e, i) => {
      if (e.unitName === newInputUnitRef.current!.value) {
        newArray[i] = {
          unitName: newInputUnitRef.current!.value,
          unitSize: parseFloat(newInputSizeRef.current!.value),
        };
        setAllUnits(newArray);
        isDuplicate = true;
      }
    });
    if (isDuplicate) return;
    setAllUnits((prevState) => [
      ...prevState,
      {
        unitName: newInputUnitRef.current!.value,
        unitSize: parseFloat(newInputSizeRef.current!.value),
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
