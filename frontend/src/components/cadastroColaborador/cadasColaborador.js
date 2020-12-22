import React, { useState } from 'react';
import './cadasColaborador.css';
import { Link } from 'react-router-dom';
import { BsChevronLeft } from "react-icons/bs";

import api from '../../services/api';

import logoTop from '../../assets/LogoCor.png'

export default function CadasColaborador() {

    const [name,setName] = useState('');
    const [nameGrup,setNameGrup] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [instagram,setInstagram] = useState('');
    const [city,setCity] = useState('');
    const [uf,setUf] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        const data = {name, nameGrup, email, whatsapp, instagram, city, uf};
        console.log(data);
        
        const response = await api.post('partners', data);
        
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

                    <div className="logo-Login"><img src={logoTop} className="logoImgCor" /></div>

                    <form className="formContent" onSubmit={handleRegister}>

                        <p className="infoTitle">CADASTRO DE COLABORADOR</p>
                        
                            <input 
                                type="text" 
                                placeholder="Nome" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <input 
                                type="text" 
                                size="50" 
                                placeholder="Nome da Equipe (Opcional)" 
                                value={nameGrup}
                                onChange={e => setNameGrup(e.target.value)}
                            />
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input 
                                type="number"
                                placeholder="Whatsapp" 
                                size="11"
                                value={whatsapp}
                                onChange={e => setWhatsapp(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Instagram" 
                                value={instagram}
                                onChange={e => setInstagram(e.target.value)}
                            />
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder="Cidade" 
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                                <input 
                                    type="text" 
                                    size="2" 
                                    placeholder="UF"
                                    value={uf}
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
