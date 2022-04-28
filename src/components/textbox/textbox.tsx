import { textbox_props } from "../../user_types/textbox_props";

import "./style.css";

export {Textbox};

function Textbox(props: textbox_props) {

    return (
        <div className="textbox">
            <p className="textbox_displayData" color="#90a4ae">
                {props.displayData}
            </p>
        </div>
    )
}