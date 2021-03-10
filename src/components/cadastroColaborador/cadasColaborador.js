import React, { useState } from 'react';
import './cadasColaborador.css';
import { Link } from 'react-router-dom';
import { BsChevronLeft } from "react-icons/bs";
import emailjs from 'emailjs-com';
//import api from '../../services/api';

import logoTop from '../../assets/LogoCor.png'

export default function CadasColaborador() {

    const [name,setName] = useState('');
    const [nameGrup,setNameGrup] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [instagram,setInstagram] = useState('');
    const [city,setCity] = useState('');
    const [uf,setUf] = useState('');


    function SendEmail(e) {
        e.preventDefault();
    
    
          emailjs.sendForm('service_nio20p5', 'template_9syl71i', e.target, 'user_ewcrw0Hj1IHBLoQVXzEbS')
            .then((result) => {
              console.log(result.text);
            }, (error) => {
              console.log(error.text);
            });
          alert('Cadastrado com Sucesso!');
        
    
      }

    return (
        <div className="containerCadColab">
            <div className="LeftContent">
                <h1 className="titleLogin">Bem vindo ao AVENTUREI</h1>
                <h2 style={{color:"white"}}>Seja nosso colaborador e proporcione novas aventuras</h2>
            </div>
            <div className="RigthContent">
                <Link className="backHome" color="#0F5045" to="/">
                    <BsChevronLeft size={16} />
                    Voltar
                </Link>
                <div className="formCadast">

                    <div className="logo-Login"><img src={logoTop} className="logoImgCor" alt="logo do Aventurei" /></div>

                    <form className="formContent" onSubmit={SendEmail}>

                        <p className="infoTitle">CADASTRO DE COLABORADOR</p>
                        
                            <input 
                                type="text" 
                                placeholder="Nome"
                                name="name_partner"
                                value={name}
                                required
                                onChange={e => setName(e.target.value)}
                            />
                            <input 
                                type="text" 
                                size="50" 
                                name="name_Equipe"
                                placeholder="Nome da Equipe (Opcional)" 
                                value={nameGrup}
                                onChange={e => setNameGrup(e.target.value)}
                            />
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                name="email_partner"
                                value={email}
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input 
                                type="tel"
                                placeholder="Whatsapp" 
                                name="whatsapp_partner"
                                maxLength="11"
                                pattern="[0-9]{2}[0-9]{5}[0-9]{4}"
                                required
                                value={whatsapp}
                                onChange={e => setWhatsapp(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Instagram" 
                                name="insta_partner"
                                value={instagram}
                                required
                                onChange={e => setInstagram(e.target.value)}
                            />
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder="Cidade" 
                                    name="city_partner"
                                    value={city}
                                    required
                                    onChange={e => setCity(e.target.value)}
                                />
                                <input 
                                    type="text" 
                                    size="2" 
                                    placeholder="UF"
                                    name="uf_partner"
                                    value={uf}
                                    required
                                    onChange={e => setUf(e.target.value)}
                                />
                            </div>
                            <p className="infoCadast">As informações repassadas serão analisadas para aprovação</p>
                            <button className="button-Cad" type="submit">CADASTRAR</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
