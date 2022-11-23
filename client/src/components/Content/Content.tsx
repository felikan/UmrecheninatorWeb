import Doofi from "../../assets/img/Doofi.png";
import Unit from "./Unit";

interface Props {
  allUnits: { unitName: string; unitSize: number }[];
  inputValue: number;
  inputValueUnitOptions: { value: number; label: string }[];

  optionActive: number;
}

interface Input {
  value: number,
  unit: string
}

function mapInputs(props: Props): Input[] {
  let values = props.allUnits.map(x => (props.inputValue * props.optionActive) / x.unitSize);
  let units = props.allUnits.map(x => x.unitName);

  let result: Input[] = [];

  for(let i = 0; i < values.length; i++){
      result.push({value: values[i],unit: units[i]} as Input);
  }

  return result;
}

function Content(props: Props) {
  return (
    <div id="container">
      <table id="output">
        <tbody>
          {mapInputs(props).map((x, i) => (
            <Unit
            key = {i}
            value = {x.value}
            unit = {x.unit}
          />
          ))}
        </tbody>
      </table>
      <img src={Doofi}/>
    </div>
  );
}

export default Content;
