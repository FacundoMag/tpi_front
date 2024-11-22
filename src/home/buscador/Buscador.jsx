import { Component } from 'react';
import lupa from '../../assets/lupa.png';
import ubicacion from '../../assets/ubicacion.png';
import casa from '../../assets/casa.png';
import './buscador.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ciudad_id: "",
            tipo_id: "",
        };
    }

    // Maneja los cambios que se hagan en el select del buscador
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className='Buscador'>
                <h1>EN BUSCA DE UN BUEN LUGAR</h1>
                <p style={{ fontSize: "x-large" }}>Encuentra tu lugar ideal en un par de clicks</p>

                <div className='BuscadorDiv'>
                    <img 
                        src={casa} 
                        alt="ERROR"
                        style={{ height: "25px", position: 'relative', top: "3px", right: "5px" }}  
                    />

                    <select 
                        className='BuscadorSelect' 
                        name='tipo_id' 
                        value={this.state.tipo_id} 
                        onChange={this.handleChange}
                    >
                        <option value={1}>Casa</option>
                        <option value={2}>Departamento</option>
                        <option value={3}>Hotel</option>
                    </select>

                    <img 
                        src={ubicacion} 
                        alt="ERROR"
                        style={{ height: "30px", position: 'relative', top: "8.5px" }}  
                    />

                    <select 
                        className='BuscadorSelect' 
                        name='ciudad_id' 
                        value={this.state.ciudad_id} 
                        onChange={this.handleChange}
                    >
                        <option value={1}>Ushuaia</option>
                        <option value={2}>Tolhuin</option>
                        <option value={3}>Río Grande</option>
                    </select>

                    <button 
                        className='BuscadorButton'
                        onClick={() => this.props.buscador(this.state.ciudad_id, this.state.tipo_id)}
                    >
                        <img 
                            src={lupa} 
                            alt="ERROR" 
                            style={{ height: '20px', width: '20px' }} 
                        />
                    </button>
                </div>
            </div>
        );
    }
}
