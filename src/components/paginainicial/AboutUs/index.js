import React from 'react'
import './aboutus.css';

import LogoBranco from '../../../assets/LogoBranco.png'

export default function AboutUs() {
    return (
        <div className="container-About">
            <div className="logo-top"><img src={LogoBranco} alt="fogueira" className="logoImg" /></div>
            <p className="textAbout">O Aventurei foi desenvolvido exclusivamente para compartilhar aventuras e proporcionar novas experiências. Nós acreditamos que a prática de atividades na natureza contribui para a qualidade de vida e para a ampliação da consciência ambiental. Por isso, estamos desenvolvendo tecnologias para aproximar os amantes da aventura e cultivar o estilo de vida outdoor.</p>
        </div>
    )
}
