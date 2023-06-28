import React, { Component } from "react";
import '../components/Stopwatch.css'


class Stopwatch extends Component {

    
    render(){
        return(

            <div className="Stopwatch">
          
                <h1 className="Timer">{this.props.numero}</h1>

            </div>

        );
    }
}


export default Stopwatch;