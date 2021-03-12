import React from 'react';
import './footer.css';

import logoTop from '../../../assets/LogoBranco.png'

export default function footer() {
    return (
        <div className="footerContainer">
            <div className="containterInfo">
                <div className="LogoInfo">
                    <div className="logo-top"><img src={logoTop} alt="fogueira" className="logoImg" /></div>
                    <p>Plataforma de busca para encontrar seu guia e proporcionar as melhores experiências de aventuras em qualquer lugar do país.</p>
                </div>
                <div className="textInfo">
                    <p><i>"O que se leva da vida é a vida que se leva."</i></p>
                    <p>Encontre o melhor destino para sua aventura!</p>
                    <p><a href="https://aventurei.com" rel="noopener noreferrer" target="_blank">aventurei.com</a></p>
                </div>
            </div>
            <div className="bottomText" ><p>Desenvolvido com amor e café.</p></div>
        </div>
    )
}
