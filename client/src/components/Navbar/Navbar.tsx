import { useRef, useState } from 'react';
import { InputValue } from '../App';
import Select from 'react-select';

interface Option {
    value: number;
    label: String;
}

let options: Option[] = [
    { value: 0.01, label: 'cm' },
    { value: 1, label: 'm' },
    { value: 1000, label: 'km' }
];

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
    let [sizeValue, setSizeValue] = useState<number>(1);

    let disabled = inputValueRef.current?.value ? true : false;

    return (
        <>
            <header className="is-flex">
                <input ref={inputValueRef} type="number" pattern="[0-9]+" id="value" />
                <Select
                    className="selectComponent"
                    classNamePrefix="select"
                    options={options}
                    defaultValue={options.filter((x) => x.label === 'm')[0]}
                    onChange={(e) => setSizeValue(e!.value)}
                />
                <button
                    onClick={(e) =>
                        props.onErleuchtinierung(
                            {
                                value: parseFloat(inputValueRef.current!.value),
                                size: sizeValue
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

export default Navbar;
