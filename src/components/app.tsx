import React, { ReactNode } from "react";
import { Button } from "./button";
import { evaluate, round } from "mathjs";
import { Textbox } from "./textbox";

type appstate = {
    expression: string,
    result: string,
}

class App extends React.Component<{}, appstate> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expression: "",
            result: "",
        };
    }

    // TODO reorder keypad buttons
    render(): ReactNode {
        return (
            <React.Fragment>
                <div id="output">
                    {this.renderTextBox(this.state.expression)}
                    {this.renderTextBox(this.state.result)}
                </div>
                <br />
                <div id="keypad">
                    <div className="keypad-row">
                        {this.renderButton("1")}
                        {this.renderButton("2")}
                        {this.renderButton("3")}
                    </div>
                    <div className="keypad-row">
                        {this.renderButton("4")}
                        {this.renderButton("5")}
                        {this.renderButton("6")}
                    </div>
                    <div className="keypad-row">
                        {this.renderButton("7")}
                        {this.renderButton("8")}
                        {this.renderButton("9")}
                    </div>
                    <div className="keypad-row">
                        {this.renderButton("0")}
                        {this.renderButton("+")}
                        {this.renderButton("-")}
                    </div>
                    <div className="keypad-row">
                        {this.renderButton("*")}
                        {this.renderButton("/")}
                        {this.renderButton("%")}
                    </div>
                    <div className="keypad-row">
                        {this.renderButton(".", "button-decimal-point")}
                        {this.renderButton("=", "button-equals")}
                        {this.renderButton("CLR", "button-c")}
                        {this.renderButton("CE", "button-ce")}
                        {this.renderButton("ANS","button-ans")}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    renderButton(displayText: string, buttonId = ""): ReactNode {
        if (buttonId !== "") {
            return (
                <Button displayText={displayText} buttonId={buttonId}
                    callbackOnClick={() => this.buttonPressHandler(displayText)}></Button>
            )
        }
        return (
            <Button displayText={displayText}
                callbackOnClick={() => this.buttonPressHandler(displayText)}></Button>
        )
    }

    renderTextBox(displayText: string): ReactNode {
        return (
            <Textbox displayData={displayText}></Textbox>
        )
    }

    buttonPressHandler(id: string): void {
        let e = this.state.expression;
        
        // Calculate
        if (id === "=") {
            this.calculateExpression();
            this.clearExpression();
            return;
        }

        // Clear all
        if (id === "CLR") {
            this.setState({ expression: "", result: "" });
            return;
        }

        // Clear last entry
        if (id === "CE") {
            e = e.slice(0, -1);
            this.setState({ expression: e });
            return;
        }

        // Input last calculated answer
        if (id === "ANS") {

            if(this.state.result === "ERROR") {
                return;
            }

            e += this.state.result;
            this.setState({expression: e})
            return;
        }

        // Append new number/operator to the expression
        e += id;

        // Expression length limit
        if (e.length > 20) {
            this.setState({ result: "ERROR" })
            return;
        }

        this.setState({ expression: e });
    }

    calculateExpression(): void {
        try {
            this.setState({ result: round(evaluate(this.state.expression), 10) as string });
        } catch (e) {
            this.errorHandler(e as Error);
        }
    }

    clearExpression() : void {
        this.setState({expression: ""});
    }

    errorHandler(error: Error) {
        console.warn((error as Error).message);
        this.setState({ result: "ERROR"})
    }
}

export { App };
