import React from 'react';
import './footer.css';
import { Link } from '@material-ui/core'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import logoTop from '../../../assets/LogoBranco.png'

export default function footer() {
    return (
        <div className="footerContainer">
            <div className="containterInfo">
                <div className="LogoInfo">
                    <div className="logo-top"><img src={logoTop} alt="fogueira" className="logoImg" /></div>
                    <p style={{marginTop:10,marginBottom:10}}>Plataforma de busca para encontrar seu guia e proporcionar as melhores experiências de aventuras em qualquer lugar do país.</p>
                    <div>
                        <Link  target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=5583981390385&text=Oi%20Miguel%2C%20queria%20conversar%20sobre%20o%20Aventurei.">
                            <WhatsAppIcon className="linkSocial" />
                        </Link>
                        <Link target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/aventurei.br/">
                            <InstagramIcon className="linkSocial"/>
                        </Link>
                    </div>
                </div>
                <div className="textInfo">
                    <p><i>"O que se leva da vida é a vida que se leva."</i></p>
                    <p>Encontre o melhor destino para sua aventura!</p>
                    <p><a href="https://aventurei.com" rel="noopener noreferrer" target="_blank">aventurei.com</a></p>
                </div>
            </div>
            <div className="bottomText" ><p>Desenvolvido com amor e café.</p></div>
        </div >
    )
}
