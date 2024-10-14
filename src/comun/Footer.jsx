import { Component } from "react";
import Boton from "./Boton"

export default class HeaderSinLogin extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <footer>
                All rights reserved SouthernEscapes®
            </footer>
        )
    }
}