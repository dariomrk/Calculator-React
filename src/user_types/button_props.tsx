export type {button_props};

type button_props = {
    displayText: string,
    className: string
    callbackOnClick : (id: string) => void,
}