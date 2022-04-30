type textbox_props = {
    displayData: string,
}

function Textbox(props: textbox_props) {

    return (
        <div className="textbox">
            <p className="textbox-data" >
                {props.displayData}
            </p>
        </div>
    )
}

export { Textbox };
