import React from 'react';

function FooterMain() {
    return (
        <footer>
            <button id="Test">Einheit hinzufüginieren</button>
            <input type="text" placeholder="Einheit" id="nameIn"/>
                <input type="number" placeholder="Größe in Meter" id="sizeIn"/>
                    <button id="Del">Löschinieren</button>
        </footer>
    );
}

export default FooterMain;