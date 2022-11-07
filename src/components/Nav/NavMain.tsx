import React from "react";
import Select from "react-select";

interface Props {
  onErleuchtinierung: () => void;
  inputValueRef: React.Ref<HTMLInputElement>;
  onSelectChange: (e: any) => void;
  inputValueUnitOptions: { value: number; label: string }[];
  selectRef: any;
}

function NavMain(props: Props) {
  return (
    <>
      <header className="is-flex">
        <input ref={props.inputValueRef} type="number" id="value" />
        <Select
          ref={props.selectRef}
          onChange={props.onSelectChange}
          options={props.inputValueUnitOptions}
          defaultValue={props.inputValueUnitOptions[1]}
        />
        <button onClick={props.onErleuchtinierung} id="enter">
          Erleuchtiniere Mich!
        </button>
      </header>
      <div>
        <hr />
      </div>
    </>
  );
}

export default NavMain;
