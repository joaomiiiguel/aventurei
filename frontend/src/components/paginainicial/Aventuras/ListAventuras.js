import React from 'react';
import './ListAventuras.css';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';


import imgCachoeira from '../../../assets/cachoeira-do-roncador.jpg'

export default function ListAventuras(props) {

    const estados = ["Brasil", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const ListEstados = estados.map((estados) =>
        <a>{estados}</a>
    );

    const aventurasApi = [
        {
            id: 1,
            title: "Cachoeira do Roncador",
            entrada: "Gratuita",
            cidade: "Bananeiras",
            estado: "Paraíba",
            like: true
        },
        {
            id: 2,
            title: "Cachoeira do Pinga",
            image: "../../../assets/cachoeira-do-roncador.jpg",
            entrada: "Gratuita",
            cidade: "Bananeiras",
            estado: "Paraíba",
            like: true
        },
        {
            id: 3,
            title: "Cachoeira do Altar",
            image: "../assets/cachoeira-do-roncador.jpg",
            entrada: "Gratuita",
            cidade: "Bananeiras",
            estado: "Paraíba",
            like: true
        },
        {
            id: 4,
            title: "Cachoeira do Altar",
            image: "../assets/cachoeira-do-roncador.jpg",
            entrada: "Gratuita",
            cidade: "Bananeiras",
            estado: "Paraíba",
            like: true
        },
    ]

    const ListaCards = aventurasApi.map((aventurasApi) =>
        <div className="cardAdventure">
            <div className="headerCard">
                
            </div>
            <h2>{aventurasApi.title}</h2>
        </div>
    );

    return (
        <div className="container-ListAdv" >

            <div className="buscaAventura">
                <h3>EXPLORE NOVAS AVENTURAS</h3>
                <div className="Advsearch">
                    <InputBase
                        className="TextSearch"
                        placeholder="Estou procurando por…"
                    />
                    <div className="searchIcon">
                        <SearchIcon />
                    </div>
                </div>

                <div className="TitleFilter">
                    <RoomOutlinedIcon />
                    <p>Escolha seu estado:</p>
                </div>

                <div className="FilterLocalWeb">
                    {ListEstados}
                </div>

            </div>

            <div className="listaAventura">
                {ListaCards}
            </div>

        </div>
    )
}
