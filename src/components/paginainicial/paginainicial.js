import React from 'react'
import './paginainicial.css';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import ListAventuras from '../paginainicial/Aventuras/ListAventuras.js'
import DicasAventurei from '../paginainicial/dicas/dicasAventurei.js'
import ComoFunc from '../paginainicial/ComoFunc/ComoFunc'
import AboutUs from '../paginainicial/AboutUs'
import Footer from '../paginainicial/footer/footer.js'
import logoTop from '../../assets/LogoBranco.png'


export default function paginainicial() {
    return (
        <div className="container-pg" >
            <Helmet>
                <meta charSet="utf-8" />
                <title>Aventurei - Encontre o melhor destino para sua aventura</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="container-top">

                <div className="header-menu">
                    <div className="logo-top"><img src={logoTop} alt="fogueira" className="logoImg" /></div>
                    <Link className="beColaborador-top" to="/seja-nosso-guia"><h4>Seja um Guia Aventurei</h4></Link>
                </div>

                <div className="header-msg">
                    <h1 className="text-Slogan">ENCONTRE O MELHOR DESTINO PARA SUA AVENTURA</h1>

                    <div className="mouse_scroll">
                        <div>
                            <span className="m_scroll_arrows unu"></span>
                            <span className="m_scroll_arrows doi"></span>
                            <span className="m_scroll_arrows trei"></span>
                        </div>
                    </div>
                </div>

            </div>
            <ComoFunc />
            <ListAventuras />
            <AboutUs />
            <DicasAventurei />
            <Footer />
        </div>
    )
}
