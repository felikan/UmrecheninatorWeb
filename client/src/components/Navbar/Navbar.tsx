import { useRef, useState } from 'react';
import { InputValue } from '../App';

function getOptionsValueByKey(value: string): Options {
    return Object.entries(Options).find(([key, _]) => key === value)?.[1] as Options;
}

interface Props {
    onErleuchtinierung: (input: InputValue, event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Navbar(props: Props) {
    // TODO: remove styling
    const customStyles = {
        control: (base: any, _: any) => ({
            ...base,
            height: '34px',
            minHeight: '34px'
        })
    };

    const inputValueRef = useRef<HTMLInputElement>(null);
    const [selectValue, setSelectValue] = useState<Options>(Options.m);

    const setSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSelectValue(getOptionsValueByKey(e.target.value));
    };

    let disabled = inputValueRef.current?.value ? true : false;

    return (
        <>
            <header className="is-flex">
                <input ref={inputValueRef} type="number" pattern="[0-9]+" id="value" />
                <select value={selectValue} onChange={(e) => setSelect(e)} id="dropdown">
                    {Object.keys(Options).map((x) => (
                        <option value={x}>{x}</option>
                    ))}
                </select>
                <button
                    onClick={(e) =>
                        props.onErleuchtinierung(
                            {
                                value: parseFloat(inputValueRef.current!.value),
                                size: selectValue
                            },
                            e
                        )
                    }
                    id="enter"
                    disabled={disabled}
                >
                    Erleuchtiniere Mich!
                </button>
            </header>
            <div id="hr">
                <hr />
            </div>
        </>
    );
}

enum Options {
    cm = 0.01,
    m = 1,
    km = 1000
}

export default Navbar;
