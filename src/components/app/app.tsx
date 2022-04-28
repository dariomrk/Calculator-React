import React, { ReactNode } from "react";
import { appstate } from "../../user_types/appstate";
import { Button } from "../button/button";
import { evaluate } from "mathjs";
import { Textbox } from "../textbox/textbox";

export { App };

class App extends React.Component<{}, appstate> { // note to self remember to define prop and state types
    constructor(props: {}) {
        super(props);
        this.state = {
            expression: "",
            result: "",
        };
    }

    render(): ReactNode {
        return (
            <React.Fragment>
                <div id="output_display">
                    {this.renderTextBox(this.state.expression)}
                    {this.renderTextBox(this.state.result)}
                </div>
                <br/>
                <div id="keypad">
                    {this.renderButton("1")}
                    {this.renderButton("2")}
                    {this.renderButton("3")}
                    <br />
                    {this.renderButton("4")}
                    {this.renderButton("5")}
                    {this.renderButton("6")}
                    <br />
                    {this.renderButton("7")}
                    {this.renderButton("8")}
                    {this.renderButton("9")}
                    <br />
                    {this.renderButton("0")}
                    {this.renderButton("+")}
                    {this.renderButton("-")}
                    <br />
                    {this.renderButton("*")}
                    {this.renderButton("/")}
                    {this.renderButton("%")}
                    <br />
                    {this.renderButton(".", "buttonDecimalPoint")}
                    {this.renderButton("=", "buttonEquals")}
                    {this.renderButton("CLR", "buttonClear")}
                </div>
            </React.Fragment>
        )
    }

    renderButton(displayText: string, componentClass = "keypadButton"): ReactNode {
        return (
            <Button displayText={displayText} className={componentClass}
                callbackOnClick={() => this.buttonPressHandler(displayText)}></Button>
        )
    }

    renderTextBox(displayText: string) : ReactNode {
        return (
            <Textbox displayData={displayText}></Textbox>
        )
    }

    buttonPressHandler(id: string): void {
        let e = this.state.expression;

        if (id === "=") {
            this.calculateExpression();
            return;
        }

        if (id === "CLR") {
            this.setState({ expression: "", result: ""});
            return;
        }

        e += id;

        this.setState({ expression: e });
    }

    calculateExpression(): void {
        this.setState({ result: evaluate(this.state.expression) as string });
    }
}