import React from 'react'
import './paginainicial.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import ListAventuras from '../paginainicial/Aventuras/ListAventuras.js'
import DicasAventurei from '../paginainicial/dicas/dicasAventurei.js'
import Footer from '../paginainicial/footer/footer.js'
import logoTop from '../../assets/LogoBranco.png'

export default function paginainicial() {
    return (
        <div  className="container-pg" >
            <div className="container-top">

                <div className="header-menu">
                    <div className="logo-top"><img src={logoTop} className="logoImg"/></div>
                    <Link className="beColaborador-top" to="/seja-colaborador"><h3>Seja um Colaborador</h3></Link>
                </div>

                <div className="header-msg">
                    <h1 className="text-Slogan">ENCONTRE O MELHOR DESTINO PARA SUA AVENTURA</h1>
                    <button className="button">Explore novas aventuras</button>
                </div>
                
            </div>

            <ListAventuras />

            <DicasAventurei />
            <Footer />
        </div>
    )
}
