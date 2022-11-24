import { MouseEventHandler, useRef } from "react";
import { Unit } from "../App";

interface Props {
  setUnit: (unit: Unit) => MouseEventHandler<HTMLButtonElement>;
  onLöschinieren: () => Promise<void>;
}

function Footer(props: Props) {
  const inputSizeRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);

  let disabled: boolean = inputSizeRef.current?.value && inputNameRef.current?.value 
    ? true 
    : false;

  return (
    <footer>
      <button 
        onClick={
          props.setUnit({
            size: parseFloat(inputSizeRef.current!.value),
            name: inputNameRef.current!.value
          })
        } 
        id="Test"
        disabled={disabled}
      >
        Einheit hinzufüginieren
      </button>
      <input
        ref={inputNameRef}
        type="text"
        placeholder="Einheit"
        id="nameIn"
      />
      <input
        ref={inputSizeRef}
        type="number"
        pattern="[0-9]+"
        placeholder="Größe in Meter"
        id="sizeIn"
      />
      <button onClick={async () => {await props.onLöschinieren();}} id="Del">
        letzte Einheit Löschinieren
      </button>
      <img
      // TODO: remove this style attribute
        style={{ float: "right", width: "150px", marginRight: "1rem" }}
        id="counter"
        src="https://counter8.optistats.ovh/private/freecounterstat.php?c=41w9u9uze1nbyuhpmjszfkwttargzlex"
      />
    </footer>
  );
}

export default Footer;
