import { button_props } from "../../user_types/button_props";

import "./style.css"

export { Button };

function Button(props: button_props) {
    return (
        <button className={props.className} onClick={() => {
            props.callbackOnClick(props.displayText);
        }}>
            {props.displayText}
        </button>
    )
}

// const Button = (props: button_props) => {
//     return (
//         <button className="Button" onClick={()=>{
//             props.callbackOnClick(props.displayText);
//         }}>
//             {props.displayText}
//         </button>
//     );
// }