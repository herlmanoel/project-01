import { Component } from "react";

import './style.css';
export class Button extends Component {
    render() {
        const { text, onCLick, disabled } = this.props;
        return (
            <button 
                className="button" 
                onClick={onCLick}
                disabled={disabled}
            >
               { text }
            </button>
        );
    }
}