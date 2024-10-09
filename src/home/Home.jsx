import { Component } from 'react';
import HeaderSinLogin from '../comun/HeaderSinLogin';

export default class Home extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <HeaderSinLogin />
        )
    }
}