import { Component } from 'react';
import lupa from '../../assets/lupa.png';
import ubicacion from '../../assets/ubicacion.png';
import casa from '../../assets/casa.png';
import './buscador.css'

export default class Home extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className='Buscador'>
                <h1>EN BUSCA DE UN BUEN LUGAR</h1>
                <p style={{fontSize: "x-large"}}>Encuentra tu lugar ideal en un par de clicks</p>

                <div className='BuscadorDiv'>

                    <img 
                        src={casa} 
                        alt="ERROR"
                        style={{height: "25px", position: 'relative', top: "3px", right: "5px"}}  
                    />

                    <select className='BuscadorSelect'>
                        <option value="casa">Casa</option>
                        <option value="departamento">Departamento</option>
                        <option value="hotel">Hotel</option>
                    </select>

                    <img 
                        src={ubicacion} 
                        alt="ERROR"
                        style={{height: "30px", position: 'relative', top: "8.5px"}}  
                    />

                    <select className='BuscadorSelect'>
                        <option value="ushuaia">Ushuaia</option>
                        <option value="tolhuin">Tolhuin</option>
                        <option value="rio grande">Río Grande</option>
                    </select>

                    <button className='BuscadorButton'>
                        <img 
                            src={lupa} 
                            alt="ERROR" 
                            style={{height: '20px', width: '20px'}} 
                        />
                    </button>

                </div>
            </div>
        )
    }
}