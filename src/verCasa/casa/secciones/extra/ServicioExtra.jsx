import { Component } from "react";

export default class ServicioExtra extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div style={{display: "flex", flexDirection: "row", marginTop: "10px"}}>
                <img 
                    src={this.props.imagen} 
                    alt="ERROR" 
                    style={{height: "20px"}} 
                />
                <span 
                    className="PublicSans" 
                    style={{margin: "1.5px 0 0 5px"}}
                >
                    {this.props.nombre}
                </span>
            </div>
        )
    }
}