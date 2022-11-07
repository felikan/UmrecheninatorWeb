import React from 'react';
import Doofi from "../../assets/img/Doofi.png"
import Units from "./BodyUnitContainer/Units";

interface Props{
    allUntis: { unitName: string; unitSize: number }[];
}

function BodyMain(props: Props) {
    return (
        <div id="container">
            <table id="output">
                <tbody>
                <Units allUnits={props.allUntis}/>

                </tbody>
            </table>
            <img src={Doofi} alt=""/>
        </div>
    );
}

export default BodyMain;