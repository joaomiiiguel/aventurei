import React, { useState } from 'react';
import './cadasColaborador.css';
import { Link } from 'react-router-dom';
import { BsChevronLeft } from "react-icons/bs";



import logoTop from '../../assets/LogoCor.png'


export default function CadasColaborador() {

    const [name,setName] = useState(0);
    const [nameGrup,setNameGrup] = useState(0);
    const [email,setEmail] = useState(0);
    const [whatsapp,setWhatsapp] = useState(0);
    const [instagram,setInstagram] = useState(0);
    const [cidade,setCidade] = useState(0);
    const [uf,setUf] = useState(0);

    
    return (
        <div className="containerCadColab">
            <div className="LeftContent">
                <h1 className="titleLogin">Bem vindo ao AVENTUREI</h1>
                <h2>Seja nosso colaborador e proporcione novas aventuras</h2>
            </div>
            <div className="RigthContent">
                <Link className="backHome" color="#0F5045" to="/">
                    <BsChevronLeft size={16} />
                    Voltar
                </Link>
                <div className="formCadast">

                    <div className="logo-Login"><img src={logoTop} className="logoImgCor" /></div>
                    <form className="formContent">

                        <p className="infoTitle">CADASTRO DE COLABORADOR</p>
                        
                            <input 
                                type="text" 
                                placeholder="Nome" 
                                value={name}
                                onChange={()=>{}}
                            />
                            <input 
                                type="text" 
                                size="50" 
                                placeholder="Nome da Equipe (Opcional)" 
                                value={nameGrup}
                                onChange={()=>{}}
                            />
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                value={email}
                                onChange={()=>{}}
                            />
                            <input 
                                placeholder="Whatsapp" 
                                value={whatsapp}
                                onChange={()=>{}}
                            />
                            <input 
                                type="text" 
                                placeholder="Instagram" 
                                value={instagram}
                                onChange={()=>{}}
                            />
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder="Cidade" 
                                    value={cidade}
                                    onChange={()=>{}}
                                />
                                <input 
                                    type="text" 
                                    size="2" 
                                    placeholder="UF"
                                    value={uf}
                                    onChange={()=>{}}
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
