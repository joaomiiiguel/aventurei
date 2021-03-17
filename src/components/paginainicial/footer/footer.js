import React, {useState} from 'react';
import './footer.css';
import { Link } from '@material-ui/core'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import logoTop from '../../../assets/LogoBranco.png';
import emailjs from 'emailjs-com';

export default function Footer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [assunto, setAssunto] = useState('');


    function SendEmail(e) {
        e.preventDefault();
        
        emailjs.sendForm('service_nio20p5', 'template_zb3o87h', e.target, 'user_ewcrw0Hj1IHBLoQVXzEbS')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        alert('Mensagem enviada com Sucesso!');

        window.location.reload();
    }

    
    return (
        <div className="footerContainer">
            <div className="containterInfo">
                <div className="LogoInfo">
                    <div className="logo-top"><img src={logoTop} alt="fogueira" className="logoImg" /></div>
                    <p style={{ marginTop: 10, marginBottom: 10 }}>Plataforma de busca para encontrar seu guia e proporcionar as melhores experiências de aventuras em qualquer lugar do país.</p>
                    <p><i>"O que se leva da vida é a vida que se leva."</i></p>
                    <div>
                        <Link target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=5583981390385&text=Oi%20Miguel%2C%20queria%20conversar%20sobre%20o%20Aventurei.">
                            <WhatsAppIcon className="linkSocial" />
                        </Link>
                        <Link target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/aventurei.br/">
                            <InstagramIcon className="linkSocial" />
                        </Link>
                    </div>
                </div>
                <div className="textInfo">
                    <form className="formContent" onSubmit={SendEmail}>
                        <h3>FALE CONOSCO</h3>
                        <input
                            type="text"
                            placeholder="Nome"
                            name="name_contato"
                            value={name}
                            required
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Assunto"
                            name="assunto_contato"
                            value={assunto}
                            required
                            onChange={e => setAssunto(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            name="email_contato"
                            value={email}
                            required
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Whatsapp"
                            name="whatsapp_contato"
                            maxLength="11"
                            pattern="[0-9]{2}[0-9]{5}[0-9]{4}"
                            required
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <textarea 
                            id="story" 
                            name="mensagem_contato"
                            rows="5" 
                            cols="33"
                            maxlength="400"
                            required
                            placeholder="Escreva aqui..."
                        />
                        <button className="button-Contact" type="submit">ENVIAR</button>
                    </form>
                </div>
            </div>
            <div className="bottomText" ><p>Desenvolvido com amor e café.</p></div>
        </div >
    )
}
