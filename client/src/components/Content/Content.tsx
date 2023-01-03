import DoofiImg from '../../assets/img/Doofi.png';
import { ConversionResult } from '../App';
import ContentUnit from './ContentUnit/ContentUnit';

function Content(props: { values: ConversionResult[] }): JSX.Element {
    return (
        <div id="content">
            <table id="output">
                <tbody>
                    {props.values.map((x, i) => (
                        <ContentUnit key={i} value={x.value} unit={x.unit} />
                    ))}
                </tbody>
            </table>
            <img src={DoofiImg} />
        </div>
    );
}

export default Content;
