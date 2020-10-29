import React from 'react'
import './paginainicial.css';
import { Button } from '@material-ui/core';

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
                    <div className="beColaborador-top"><h3>Seja um Colaborador</h3></div>
                </div>

                <div className="header-msg">
                    <h1 className="text-Slogan">ENCONTRE O MELHOR DESTINO PARA SUA AVENTURA</h1>
                    <Button size="large" variant="contained" >Explore novas aventuras</Button>
                </div>
                
            </div>

            <ListAventuras />

            <DicasAventurei />
            <Footer />
        </div>
    )
}
