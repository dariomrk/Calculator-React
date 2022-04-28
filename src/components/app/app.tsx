import React, { ReactNode } from "react";
import { appstate } from "../../user_types/appstate";
import { Button } from "../button/button";

export {App};

class App extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            operand1 : 0,
            operand2 : 0,
            operator : "+",
            result : 0,
        } as appstate;
    }

    render() : ReactNode {
        return (
            <React.Fragment>
                {this.renderButton("1")}
                {this.renderButton("2")}
                {this.renderButton("3")}
                <br/>
                {this.renderButton("4")}
                {this.renderButton("5")}
                {this.renderButton("6")}
                <br/>
                {this.renderButton("7")}
                {this.renderButton("8")}
                {this.renderButton("9")}
                <br/>
                {this.renderButton("+")}
                {this.renderButton("-")}
                {this.renderButton("x")}
                <br/>
                {this.renderButton("/")}
                {this.renderButton("%")}
                {this.renderButton("=")}
            </React.Fragment>
        )
    }

    buttonPressHandler(id : string) : void {
        // TODO: implement
        // pass this method as callbackOnClick prop to
        // <Button> component to handle a button press

        console.log(`Button press detected: ${id}`); // REMOVE: testing purposes only
    }

    renderButton(id: string) : ReactNode {
        return ( 
            <Button displayText={id}
            callbackOnClick={() => this.buttonPressHandler(id)}></Button>
        )
    }
}