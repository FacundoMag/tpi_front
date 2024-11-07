import { Component } from "react";
import ServicioExtra from "./extra/ServicioExtra";
import wifi from "../../../assets/wifi.png";
import pileta from "../../../assets/pileta.png";
import aireAcondicionado from "../../../assets/aireAcondicionado.png";
import cable from "../../../assets/cable.png";
import garaje from "../../../assets/garaje.png";
import patio from "../../../assets/patio.png";

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

                    {this.props.servicios.map((cont, index) => 
                        cont.servicios === "WIFI" ? (

                            <ServicioExtra imagen={wifi} nombre="Wi-Fi" />

                        ) : cont.servicios === "Piscina" ? (

                                <ServicioExtra imagen={pileta} nombre="Pileta" />

                        ) : cont.servicios === "Aire Acondicionado" ? (

                                <ServicioExtra imagen={aireAcondicionado} nombre="Aire acondicionado" />

                        ) : cont.servicios === "Cable" ? (

                                <ServicioExtra imagen={cable} nombre="Cable" />

                        ) : cont.servicios === "Garaje" ? (

                                <ServicioExtra imagen={garaje} nombre="Garaje" />

                        ) : cont.servicios === "Patio" ? (

                                <ServicioExtra imagen={patio} nombre="Patio" />

                        ) : null
                    )}
                </div>
            </div>
        )
    }
}