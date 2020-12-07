import React from 'react'
import './paginainicial.css';
import { Link } from 'react-router-dom';
import { BsChevronDoubleDown } from "react-icons/bs";

import ListAventuras from '../paginainicial/Aventuras/ListAventuras.js'
import DicasAventurei from '../paginainicial/dicas/dicasAventurei.js'
import Footer from '../paginainicial/footer/footer.js'
import logoTop from '../../assets/LogoBranco.png'
import scrollDown from '../../assets/scroll.gif'
import emBreve from '../../assets/embreve.png'

export default function paginainicial() {
    return (
        <div className="container-pg" >
            <div className="container-top">

                <div className="header-menu">
                    <div className="logo-top"><img src={logoTop} alt="fogueira" className="logoImg" /></div>
                    <Link className="beColaborador-top" to="/seja-colaborador"><h3>Seja um Colaborador</h3></Link>
                </div>

                <div className="header-msg">
                    <h1 className="text-Slogan">ENCONTRE O MELHOR DESTINO PARA SUA AVENTURA</h1>
                    <div class="mouse_scroll">

                        <div class="mouse">
                            <div class="wheel"></div>
                        </div>
                        <div>
                            <span class="m_scroll_arrows unu"></span>
                            <span class="m_scroll_arrows doi"></span>
                            <span class="m_scroll_arrows trei"></span>
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
