import React, { ReactNode } from "react";
import { Button } from "./button";
import { evaluate, round } from "mathjs";
import { Textbox } from "./textbox";

type appstate = {
    expression: string,
    result: string,
    history: Array<string>,
    historyIndex: number,
    advancedMode : boolean,
}

class App extends React.Component<{}, appstate> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expression: "",
            result: "",
            history: [],
            historyIndex: 0,
            advancedMode: false,
        };
    }

    buttons = {
        plus : "+",
        minus : "-",
        mul : "*",
        div : "/",
        mod : "%",
        decimalPoint : ".",
        eq : "=",
        clr : "CLR",
        ce : "CE",
        ans : "ANS",
        back : "<",
        forward : ">",

    }

    // TODO: reorder keypad buttons
    // TODO: create keypad component
    // TODO: create advanced keypad component
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
                        {this.renderButton(".", this.buttons.decimalPoint)}
                        {this.renderButton("=", this.buttons.eq)}
                        {this.renderButton("CLR",this.buttons.clr)}
                        {this.renderButton("CE",this.buttons.ce)}
                    </div>
                    <div className="keypad-row">
                        {this.renderButton("<",this.buttons.back)}
                        {this.renderButton(">",this.buttons.forward)}
                        {this.renderButton("ANS",this.buttons.ans)}
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
        let expr = this.state.expression;

        // Calculate
        if (id === "=") {
            if(this.calculateExpression()){
                this.updateHistory();
            }
            this.clearExpression();
            return;
        }

        // Clear all
        if (id === this.buttons.clr) {
            this.setState({ expression: "", result: "" });
            return;
        }

        // Clear last entry
        if (id === this.buttons.ce) {
            expr = expr.slice(0, -1);
            this.setState({ expression: expr });
            return;
        }

        // Input last calculated answer
        if (id === this.buttons.ans) {

            if (this.state.result === "ERROR") {
                return;
            }

            expr += this.state.result;
            this.setState({ expression: expr })
            return;
        }

        // Go back in history
        if (id === this.buttons.back) {
            let i = this.state.historyIndex;
            i--;
            if (i < 0) {
                return;
            }
            this.clearExpression();
            const e = this.state.history[i];
            this.setState({ historyIndex: i, expression: e});
            return;
        }

        // Go forward in history
        if (id === this.buttons.forward) {
            let i = this.state.historyIndex;
            i++;
            if (i > this.state.history.length) {
                return;
            }
            this.clearExpression();
            const e = this.state.history[i];
            this.setState({ historyIndex: i, expression: e});
            return;
        }

        // Append new number/operator to the expression
        expr += id;

        // Expression length limit
        if (expr.length > 20) {
            this.setState({ result: "ERROR" })
            return;
        }

        this.setState({ expression: expr });
    }

    calculateExpression(): boolean {
        try {
            this.setState({ result: round(evaluate(this.state.expression), 10) as string });
        } catch (e) {
            this.errorHandler(e as Error);
            return false;
        }
        return true;
    }

    clearExpression(): void {
        this.setState({ expression: "" });
    }

    errorHandler(error: Error) {
        console.warn((error as Error).message);
        this.setState({ result: "ERROR" })
    }

    updateHistory(): void {
        let h = this.state.history;
        h.push(this.state.expression);
        this.setState({ history: h, historyIndex: h.length });
    }

}

export { App };
