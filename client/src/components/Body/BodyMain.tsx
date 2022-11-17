import React from "react";
import Doofi from "../../assets/img/Doofi.png";
import Units from "./BodyUnitContainer/Units";

interface Props {
  allUnits: { unitName: string; unitSize: number }[];
  inputValue: number;
  inputValueUnitOptions: { value: number; label: string }[];

  optionActive: number;
}

function BodyMain(props: Props) {
  return (
    <div id="container">
      <table id="output">
        <Units
          allUnits={props.allUnits}
          optionActive={props.optionActive}
          inputValue={props.inputValue}
          inputValueUnitOptions={props.inputValueUnitOptions}
        />
      </table>
      <img src={Doofi} alt="" />
    </div>
  );
}

export default BodyMain;
