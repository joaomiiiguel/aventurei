import React from 'react'
import { Link } from 'react-router-dom';
import './localAventura.css';

import logoTopCor from '../../assets/LogoCor.png'

export default function localAventura() {
    return (
        <div>
            <div className="header-menuLocal">
                <div className="logo-top"><img src={logoTopCor} alt="fogueira" className="logoImg" /></div>
                <Link className="beColaborador-top" to="/seja-colaborador"><h3 style={{color:'#0F5045'}}>Seja um Colaborador</h3></Link>
            </div>
            <div  className="local-Aventura">
                <h1>Cachoeira do Roncador</h1>
            </div>
        </div>
    )
}
