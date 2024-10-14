import { Component } from 'react';

export default class Home extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className='Buscador'>
                <h1>En Busca de un Buen Lugar</h1>
                <p style={{fontSize: "x-large"}}>Encuentra tu lugar ideal en un par de clicks</p>

                <input type="text" />
            </div>
        )
    }
}