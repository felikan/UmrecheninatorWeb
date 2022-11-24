import { useEffect, useState } from 'react';
import { deleteUnit, getAllUnits, saveUnit } from '../Controller';
import Navbar from './Navbar/Navbar';
import Content from './Content/Content';
import Footer from './Footer/Footer';
import audioeffects from '../assets/audioeffects.json';

function mapInputs(units: Unit[], input: InputValue): ConversionResult[] {
    return units.map(({ size, name }) => ({ value: (input.value * input.size) / size, unit: name } as ConversionResult));
}

function App() {
    let [allUnits, setAllUnits] = useState<Unit[]>([]);
    const [inputValue, setInputValue] = useState<InputValue>({ value: 0, size: 1 });

    useEffect(() => {
        async () => {
            setAllUnits(await getAllUnits());
        };
    });

    const onErleuchtinierung = (input: InputValue) => {
        if (input.value === 420) new Audio('/Microwave.mp3').play();

        setInputValue(input);
    };

    const onHinzufüginierung = async (unit: Unit) => {
        if (allUnits.includes(unit)) return;

        await saveUnit(unit);
        setAllUnits(await getAllUnits());

        audioeffects.map((e) => {
            if (unit.name === e.name) new Audio(e.source).play();
        });
    };

    const onLöschinieren = async () => {
        await deleteUnit(allUnits.length - 1);
        setAllUnits(await getAllUnits());
    };

    return (
        <>
            <Navbar onErleuchtinierung={onErleuchtinierung} />
            <Content values={mapInputs(allUnits, inputValue)} />
            <Footer onHinzufüginierung={onHinzufüginierung} onLöschinieren={onLöschinieren} />
        </>
    );
}

export default App;

export interface Unit {
    id?: number;
    size: number;
    name: string;
}

export interface InputValue {
    value: number;
    size: number;
}

export interface ConversionResult {
    value: number;
    unit: string;
}
