import { Component } from "react";
import estrellaVacia from "../../../assets/estrellaVacia.png";
import estrellaLlena from "../../../assets/estrellaLlena.png";
import BotonReservar from "./extra/BotonReservar";
import corazonBlanco from "../../../assets/corazonBlanco.png";
import corazonRojo from "../../../assets/corazonRojo.png";

export default class DatosPrincipales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estrellas: [estrellaVacia, estrellaVacia, estrellaVacia, estrellaVacia, estrellaVacia],
            rutaReservar: "/ver-casa/pago",
            corazon: corazonBlanco,
        };
        this.botonCorazon = this.botonCorazon.bind(this);
    }

    componentDidMount() {
        this.estrellas();
    }

    estrellas() {
        let { nota } = this.props;

        // Asegurarse de que 'nota' esté entre 0 y 5
        nota = Math.min(Math.max(nota, 0), 5);

        const estrellasActualizadas = this.state.estrellas.map((_, index) =>
            index < nota ? estrellaLlena : estrellaVacia
        );

        this.setState({ estrellas: estrellasActualizadas });
    }

    botonCorazon() {
        this.setState((prevState) => ({
            corazon: prevState.corazon === corazonBlanco ? corazonRojo : corazonBlanco,
        }));
    }

    render() {
        const { imagen, direccion, ciudad, tamaño, habitaciones, baños, precio } = this.props;
        const { estrellas, corazon, rutaReservar } = this.state;

        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "50%" }}>
                    <img src={imagen} alt="ERROR" style={{ width: "100%" }} />
                </div>

                <div className="DatosPrincipales" style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {estrellas.map((estrella, index) => (
                            <img key={index} src={estrella} alt="ERROR" style={{ height: "20px", paddingLeft: index > 0 ? "5px" : "0px" }} />
                        ))}
                    </div>

                    <span className="PublicSans" style={{ fontSize: "x-large", fontWeight: "bold" }}>
                        {direccion}, {ciudad}
                    </span>

                    <p style={{ color: "black" }}>
                        Tamaño: <span style={{ fontWeight: "bold" }}>{tamaño} m<span dangerouslySetInnerHTML={{ __html: "&sup2;" }} /></span>
                    </p>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <span style={{ color: "black" }}>
                            Habitaciones: <span style={{ fontWeight: "bold" }}>{habitaciones}</span>
                        </span>
                        <span style={{ color: "black", marginLeft: "100px" }}>
                            Baños: <span style={{ fontWeight: "bold" }}>{baños}</span>
                        </span>
                    </div>

                    <span className="PrecioCasa">${precio}</span>

                    <div className="LineaHorizontal" />

                    <BotonReservar ruta={rutaReservar} estilo="BotonReservar">
                        RESERVAR
                    </BotonReservar>

                    <button
                        className="BotonInvisible"
                        onClick={this.botonCorazon}
                        style={{ marginRight: "575px", marginTop: "10px" }}
                    >
                        <img alt="ERROR" style={{ height: "45px" }} src={corazon} />
                    </button>
                </div>
            </div>
        );
    }
}
