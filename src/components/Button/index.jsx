import { Component } from "react";

export class Button extends Component {
    render() {
        const { text, onCLick } = this.props;
        return (
            <button onClick={onCLick}>
               { text }
            </button>
        );
    }
}