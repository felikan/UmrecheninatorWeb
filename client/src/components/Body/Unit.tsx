interface Props {
  value: number;
  unit: string;
}

function Unit(props: Props) {
  return (
      <tr>
        <td>{"in " + props.unit}</td>
        <td>{props.value}</td>
      </tr>
  );
}

export default Unit;
