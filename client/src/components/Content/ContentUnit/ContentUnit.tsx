import { ConversionResult } from "../../App";

function ContentUnit(props: ConversionResult): JSX.Element {
  return (
      <tr>
        <td>{'in ' + props.unit}</td>
        <td>{props.value}</td>
      </tr>
  );
}

export default ContentUnit;
