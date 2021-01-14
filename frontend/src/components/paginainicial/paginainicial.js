import React from 'react'
import './paginainicial.css';
import { Link } from 'react-router-dom';


import ListAventuras from '../paginainicial/Aventuras/ListAventuras.js'
import DicasAventurei from '../paginainicial/dicas/dicasAventurei.js'
import Footer from '../paginainicial/footer/footer.js'
import logoTop from '../../assets/LogoBranco.png'


export default function paginainicial() {
    return (
        <div className="container-pg" >
            <div className="container-top">

                <div className="header-menu">
                    <div className="logo-top"><img src={logoTop} alt="fogueira" className="logoImg" /></div>
                    <Link className="beColaborador-top" to="/seja-colaborador"><h3>Seja um partner</h3></Link>
                </div>

                <div className="header-msg">
                    <h1 className="text-Slogan">ENCONTRE O MELHOR DESTINO PARA SUA AVENTURA</h1>
                    <div className="mouse_scroll">

                        <div className="mouse">
                            <div className="wheel"></div>
                        </div>
                        <div>
                            <span className="m_scroll_arrows unu"></span>
                            <span className="m_scroll_arrows doi"></span>
                            <span className="m_scroll_arrows trei"></span>
                        </div>
                    </div>
                </div>

            </div>

            <ListAventuras />

            <DicasAventurei />
            <Footer />
        </div>
    )
}
