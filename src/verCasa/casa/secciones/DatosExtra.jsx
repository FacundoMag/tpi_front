import { Component } from "react";
import ServicioExtra from "./extra/ServicioExtra";
import wifi from "../../../assets/wifi.png";
import cable from "../../../assets/cable.png";
import pileta from "../../../assets/pileta.png";

export default class DatosExtra extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="DatosExtra">
                <div className="DescripcionServicio">
                    <span className="PublicSans" style={{fontWeight: "bold"}}>Descripción</span>
                    <span className="PublicSans" style={{color: "#5F6C72", marginTop: "10px"}}>{this.props.descripcion}</span>
                </div>

                <div className="DescripcionServicio" style={{marginLeft: "20px"}}>
                    <span className="PublicSans" style={{fontWeight: "bold"}}>Servicios extra</span>

                    {this.props.wifi && (
                        <ServicioExtra 
                            imagen={wifi}
                            nombre="Wi-Fi"
                        />
                    )}

                    {this.props.cable && (
                        <ServicioExtra 
                            imagen={cable}
                            nombre="Cable"
                        />
                    )}

                    {this.props.pileta && (
                        <ServicioExtra 
                            imagen={pileta}
                            nombre="Pileta"
                        />
                    )}
                </div>
            </div>
        )
    }
}