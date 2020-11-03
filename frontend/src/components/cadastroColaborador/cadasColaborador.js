import React from 'react';
import './cadasColaborador.css';
import { Link } from 'react-router-dom';
import { BsChevronLeft } from "react-icons/bs";



import logoTop from '../../assets/LogoCor.png'


export default function cadasColaborador() {
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
                    
                    <div className="logo-Login"><img src={logoTop} className="logoImgCor"/></div>
                    <div className="formContent">
                        
                    <p className="infoTitle">CADASTRO DE COLABORADOR</p>
                        <input type="text" placeholder="Nome" />
                        <input type="text" size="50" placeholder="Nome da Equipe(Opcional)" />
                        <input type="email" placeholder="E-mail" />
                        <input placeholder="Whatsapp" />
                        <input type="text" placeholder="Instagram" />
                        <div className="input-group">
                            <input type="text" placeholder="Cidade"/>
                            <input type="text" size="2" placeholder="UF"/>
                        </div>
                        <p className="infoCadast">As informações repassadas serão analisadas para aprovação</p>
                        <button className="button-Cad">CADASTRAR</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
