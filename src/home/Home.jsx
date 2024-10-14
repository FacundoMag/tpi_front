import { Component } from 'react';
import HeaderSinLogin from '../comun/HeaderSinLogin';
import Buscador from './Buscador'
import Footer from "../comun/Footer"

export default class Home extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <>
                <HeaderSinLogin />

                <Buscador />

                <Footer />
            </>
        )
    }
}