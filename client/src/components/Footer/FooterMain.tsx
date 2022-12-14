import React from "react";

interface Props {
  newInputSizeRef: React.Ref<HTMLInputElement>;
  newInputUnitRef: React.Ref<HTMLInputElement>;
  onHinzufüginierung: () => void;
  onLöschinieren: () => void;
}

function FooterMain(props: Props) {
  return (
    <footer>
      <button onClick={props.onHinzufüginierung} id="Test">
        Einheit hinzufüginieren
      </button>
      <input
        ref={props.newInputUnitRef}
        type="text"
        placeholder="Einheit"
        id="nameIn"
      />
      <input
        ref={props.newInputSizeRef}
        type="number"
        placeholder="Größe in Meter"
        id="sizeIn"
      />
      <button onClick={props.onLöschinieren} id="Del">
        Löschinieren
      </button>
      <img
        style={{ float: "right", width: "150px", marginRight: "1rem" }}
        id="counter"
        src="https://counter8.optistats.ovh/private/freecounterstat.php?c=41w9u9uze1nbyuhpmjszfkwttargzlex"
      />
    </footer>
  );
}

export default FooterMain;
