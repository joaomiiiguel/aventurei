import React from 'react'
import './aboutus.css';

import LogoBranco from '../../../assets/LogoBranco.png'

export default function AboutUs() {
    return (
        <div className="container-About">
            <div className="logo-top"><img src={LogoBranco} alt="fogueira" className="logoImg" /></div>
            <p className="textAbout">O Aventurei foi desenvolvido para te proporcionar experiências marcantes. Nossa filosofia é cultivar a consciência ambiental, cuidando, preservando e melhorando a qualidade de vida dos nossos. Por este motivo, estamos desenvolvendo tecnologias para maximizar suas aventuras e equilibrar vivências incríveis, no melhor estilo de vida outdoor.</p>
        </div>
    )
}
