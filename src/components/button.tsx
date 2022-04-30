type button_props = {
    displayText: string,
    buttonId?: string,
    callbackOnClick: (id: string) => void,
}

function Button(props: button_props) {
    return (
        <button className="button" id={props.buttonId} onClick={() => {
            props.callbackOnClick(props.displayText);
        }}>
            {props.displayText}
        </button>
    )
}

export { Button };
