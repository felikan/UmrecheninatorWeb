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
  const customStyles = {
    control: (base: any, _: any) => ({
      ...base,
      height: "34px",
      minHeight: "34px",
    }),
  };

  return (
    <>
      <header className="is-flex">
        <input ref={props.inputValueRef} type="number" id="value" />
        <Select
          ref={props.selectRef}
          onChange={props.onSelectChange}
          options={props.inputValueUnitOptions}
          defaultValue={props.inputValueUnitOptions[1]}
          classNamePrefix="select"
          id="dropdown"
          styles={customStyles}
        />
        <button onClick={props.onErleuchtinierung} id="enter">
          Erleuchtiniere Mich!
        </button>
      </header>
      <div id="hr">
        <hr />
      </div>
    </>
  );
}

export default NavMain;
