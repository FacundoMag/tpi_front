import { Component } from "react";
import { Link } from 'wouter';
import Header from '../comun/header/Header';
import Footer from "../comun/Footer";
import "./PagoRealizado.css";

export default class PagoRealizado extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Header
                    mostrarHeader = {true}
                ></Header>

                <div className="CuadroPagoRealizado">
                    <div className="success-message">
                        <div className="icon">
                            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="12" fill="#00C853"/>
                                <path d="M9 12.5l2 2L15 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h2>Su reserva se ha hecho correctamente</h2>
                        <div className="buttons">
                            <Link to="/">
                                <button className="go-home">Ir a Home</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        );
    }
}
