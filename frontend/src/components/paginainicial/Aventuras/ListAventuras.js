import React from 'react';
import './ListAventuras.css';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import imgCachoeira from '../../../assets/cachoeira-do-roncador.jpg'

export default function ListAventuras(props) {
    const estados = ["Brasil", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const ListEstados = estados.map((estados) =>
        <a>{estados}</a>
    );
    const [UF, setUF] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const aventurasApi = [
        {
            id: 1,
            title: "Cachoeira do Roncador",
            entrada: "Gratuita",
            cidade: "Bananeiras",
            estado: "PB",
            like: true
        },
        {
            id: 2,
            title: "Cachoeira do Pinga",
            image: "../../../assets/cachoeira-do-roncador.jpg",
            entrada: "R$30",
            cidade: "Bananeiras",
            estado: "PB",
            like: true
        },
        {
            id: 3,
            title: "Cachoeira do Altar",
            image: "../assets/cachoeira-do-roncador.jpg",
            entrada: "Gratuita",
            cidade: "Bananeiras",
            estado: "PB",
            like: true
        },
        {
            id: 4,
            title: "Cachoeira do Altar",
            image: "../assets/cachoeira-do-roncador.jpg",
            entrada: "R$45",
            cidade: "Bananeiras",
            estado: "PB",
            like: true
        },
        {
            id: 1,
            title: "Cachoeira do Roncador",
            entrada: "Gratuita",
            cidade: "Bananeiras",
            estado: "PB",
            like: true
        },
        {
            id: 2,
            title: "Cachoeira do Pinga",
            image: "../../../assets/cachoeira-do-roncador.jpg",
            entrada: "R$30",
            cidade: "Bananeiras",
            estado: "PB",
            like: true
        },
        {
            id: 3,
            title: "Cachoeira do Altar",
            image: "../assets/cachoeira-do-roncador.jpg",
            entrada: "Gratuita",
            cidade: "Bananeiras",
            estado: "PB",
            like: true
        },
        {
            id: 4,
            title: "Cachoeira do Altar",
            image: "../assets/cachoeira-do-roncador.jpg",
            entrada: "R$45",
            cidade: "Bananeiras",
            estado: "PB",
            like: true
        },
    ]

    const ListaCards = aventurasApi.map((aventurasApi) =>
        <div className="cardAdventure">
            <div className="headerCard">
                <IconButton color="primary">
                    <FavoriteBorderRoundedIcon style={{ color: "white" }} />
                </IconButton>
                <div className="precoHead">
                    <h4>{aventurasApi.entrada}</h4>
                </div>
            </div>
            <div className="bottonCard">
                <h2>{aventurasApi.title}</h2>
                <div className="localAdventure">
                    <RoomOutlinedIcon style={{ color: "white" }} fontSize="small" />
                    <h4>{aventurasApi.cidade}-{aventurasApi.estado}</h4>
                </div>
            </div>
        </div>
    );

    const handleClickListItem = (event) => {
        setUF(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setUF(null);
    };

    const handleClose = () => {
        setUF(null);
    };


    return (
        <div className="container-ListAdv" >

            <div className="buscaAventura">
                <p className="tituloBranco">EXPLORE <b>NOVAS AVENTURAS</b></p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="Advsearch">
                        <InputBase
                            className="TextSearch"
                            placeholder="Estou procurando por…"
                            size="large"
                        />
                        <div className="searchIcon">
                            <SearchIcon />
                        </div>
                    </div>
                    <div className="formBottom">
                        <select className="custom-select" >
                            {estados.map((option, index) => (
                                <option
                                    key={option}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            <div className="listaAventura">
                {ListaCards}
            </div>

        </div>
    )
}
