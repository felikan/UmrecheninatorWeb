import { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Content from './Content/Content';
import Footer from './Footer/Footer';
import audioeffects from '../assets/audioeffects.json';
import { Client, Unit } from '../Controller';

function mapInputs(units: Unit[], input: InputValue): ConversionResult[] {
    return units.map(({ size, name }) => ({ value: (input.value * input.size) / size, unit: name } as ConversionResult));
}

function App() {
    const _client = new Client();

    function onErleuchtinierung(input: InputValue) {
        if (input.value === 420) new Audio('/Microwave.mp3').play();

        setInputValue(input);
    }

    async function onHinzufüginierung(unit: Unit) {
        if (allUnits.includes(unit)) return;

        setAllUnits(await _client.insert(unit));

        audioeffects.map((e) => {
            if (unit.name === e.name) new Audio(e.source).play();
        });
    }

    async function onLöschinieren() {
        setAllUnits(await _client.del(allUnits.length - 1));
    }

    let [allUnits, setAllUnits] = useState<Unit[]>([]);
    const [inputValue, setInputValue] = useState<InputValue>({ value: 0, size: 1 });

    useEffect(() => {
        _client.getAll().then((data) => setAllUnits(data));
    }, []);

    return (
        <>
            <Navbar onErleuchtinierung={onErleuchtinierung} />
            <Content values={mapInputs(allUnits, inputValue)} />
            <Footer onHinzufüginierung={onHinzufüginierung} onLöschinieren={onLöschinieren} />
        </>
    );
}

export default App;

export interface InputValue {
    value: number;
    size: number;
}

export interface ConversionResult {
    value: number;
    unit: string;
}
