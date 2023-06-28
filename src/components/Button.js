import React, { Component } from "react";
import '../components/Button.css'

class Button extends Component {
    render(){
        return(
            <div className="Button">
                <button className={this.props.color} onClick={this.props.actionBtn}>{this.props.name}</button>
            </div>

        );
    }
}

export default Button;