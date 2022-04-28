import { textbox_props } from "../../user_types/textbox_props";

export {Textbox};

function Textbox(props: textbox_props) {

    return (
        <div className="Textbox">
            <p className="Textbox_displayData">
                {props.displayData}
            </p>
        </div>
    )
}