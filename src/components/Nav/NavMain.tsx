import React from 'react';

function NavMain() {
    return (
        <>
        <header>
            <input type="number" id="value"/>
            <select name="unit" id="unit">
                <option value="km">km</option>
                <option value="m" selected>m</option>
                <option value="cm">cm</option>
            </select>
            <button id="enter">Erleuchtiniere Mich!</button>
        </header>
    <div><hr/></div>
        </>
    );
}

export default NavMain;