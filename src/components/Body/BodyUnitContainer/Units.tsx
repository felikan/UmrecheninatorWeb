import React from "react";

interface Props {
  allUntis: { unitName: string; unitSize: number }[];
  inputValue: number;
  inputValueUnitOptions: { value: number; label: string; active: boolean }[];
  optionActive: number;
}

function Units(props: Props) {
  console.log(props.optionActive);
  return (
    <>
      {props.allUntis.map((e, i) => (
        <tbody key={i}>
          <tr>
            <td>{e.unitName}</td>
            <td>{(props.inputValue * props.optionActive) / e.unitSize}</td>
          </tr>
        </tbody>
      ))}
    </>
  );
}

export default Units;
