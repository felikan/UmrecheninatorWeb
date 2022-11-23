import { useEffect, useRef, useState } from "react";
import NavMain from "./Nav/NavMain";
import Body from "./Body/Body";
import FooterMain from "./Footer/FooterMain";
import axios from "axios";
import AktivinierungsZeichenkettenUndTolleMusik from "../helpers/AktivinierungsZeichenkettenUndTolleMusik";

function App() {
  const inputValueRef = useRef<HTMLInputElement>(null);
  const inputValueValue: number | undefined = inputValueRef.current?.value ? parseFloat(inputValueRef.current?.value) : undefined;
  
  const newInputUnitRef = useRef<HTMLInputElement>(null);
  const newInputUnitValue: string = newInputUnitRef.current?.value ?? "";

  const newInputSizeRef = useRef<HTMLInputElement>(null);
  const newInputSizeValue: number | undefined = newInputSizeRef.current?.value ? parseFloat(newInputSizeRef.current?.value) : undefined;
  
  const selectRef = useRef<any>(null);
  const [allUnits, setAllUnits] = useState<
    { _id: string; unitName: string; unitSize: number }[]
  >([]);
  const [allUnitsID, setAllUnitsID] = useState<
    { id: string; unitName: string; unitSize: number }[]
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

    axios
      .get("http://localhost:8080/api/getAll")
      .then(res => {
        setAllUnits(res.data);
        setAllUnitsID(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const onSubmitNewInput = () => {
    const newUnit = {
      newInputUnitRef: newInputUnitValue,
      newInputSizeRef: newInputSizeValue,
    };
    axios
      .post("http://localhost:8080/api/insert", newUnit)
      .then(res => {
        setAllUnits(prevState => prevState.slice(0, -1));
        setAllUnits(prevState => [...prevState, res.data]);
      })
      .catch(err => console.log(err));
  };

  const onErleuchtinierung = () => {
    const MikrowellenAktivinierungsNummer = 420;
    if (!inputValueValue) return;
    if (inputValueValue === MikrowellenAktivinierungsNummer) {
      let audio = new Audio("/Microwave.mp3");
      audio.play();
    }

    setInputValue(inputValueValue);
  };

  const onSelectChange = (e: any) => {
    inputValueUnitOptions.map((element, i) => {
      if (element.value === e.value) {
        setOptionActive(inputValueUnitOptions[i].value);
      }
    });
  };

  const onHinzufüginierung = () => {
    if (!newInputSizeValue) return;
    if (!newInputUnitRef.current) return;
    if (!newInputSizeRef.current) return;

    if (
      newInputUnitRef.current.value.length === 0 ||
      newInputSizeRef.current.value.length === 0
    )
      return;

    AktivinierungsZeichenkettenUndTolleMusik().map(e => {
      if (newInputUnitValue === e.name) {
        let audio = new Audio(e.source);
        audio.play();
      }
    });
    const newArray = [...allUnits];
    var isDuplicate = false;

    allUnits.map(e => {
      if (
        e.unitName === newInputUnitValue &&
        e.unitSize === newInputSizeValue
      )
        return;
    });
    newArray.map((e, i) => {
      if (e.unitName === newInputUnitValue) {
        newArray[i] = {
          _id: "",
          unitName: newInputUnitValue,
          unitSize: newInputSizeValue
        };
        setAllUnits(newArray);
        isDuplicate = true;
        onSubmitNewInput();
      }
    });
    if (isDuplicate) return;
    setAllUnits(prevState => [
      ...prevState,
      {
        _id: "",
        unitName: newInputUnitValue,
        unitSize: newInputSizeValue
      },
    ]);
    onSubmitNewInput();
  };

  const onLöschinieren = () => {
    const defaultAllUnitsLength = 8;
    if (allUnits.length === defaultAllUnitsLength) return;
    setAllUnits(prevState => prevState.slice(0, -1));

    axios
      .delete(
        `http://localhost:8080/api/del/${allUnits[allUnits.length - 1]._id}`
      )
      .then()
      .catch(err => console.log(err));
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
      <Body
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
