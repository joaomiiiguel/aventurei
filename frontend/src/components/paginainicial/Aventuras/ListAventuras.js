import React from 'react';
import './ListAventuras.css';
import { Button, InputBase, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

export default function ListAventuras(props) {

    const estados = ["Brasil","AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
    const listEstados = estados.map((estados) =>
    <a>{estados}</a>
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
                        <RoomOutlinedIcon/>
                        <p>Escolha seu estado:</p>
                </div>
                
                <div className="FilterLocalWeb">
                    {listEstados}
                </div>
                <div className="FilterLocalMobile">
                    {listEstados}
                </div>
            </div>

            <div className="listaAventura"></div>

        </div>
    )
}
