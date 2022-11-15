import React from "react";

interface Props {
  allUnits: { unitName: string; unitSize: number }[];
  inputValue: number;
  inputValueUnitOptions: { value: number; label: string }[];

  optionActive: number;
}

function Units(props: Props) {
  return (
    <>
      {props.allUnits.map((e, i) => (
        <tbody key={i}>
          <tr>
            <td>{"in " + e.unitName}</td>
            <td>{(props.inputValue * props.optionActive) / e.unitSize}</td>
          </tr>
        </tbody>
      ))}
    </>
  );
}

export default Units;
