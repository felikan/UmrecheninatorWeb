import React from 'react';

interface Props{
    allUntis: { unitName: string; unitSize: number }[];
}


function Units(props: Props) {
    console.log(props.allUntis, "-")
    return (
        <div></div>
    );
}

export default Units;