import React, {useEffect, useState} from 'react';
import './ListAventuras.css';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

import api from '../../../services/api';

export default function ListAventuras(props) {
    const estados = ["Brasil", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [place, setPlace] = useState([]);
    
    function loadPlaces(){
        api.get('places').then(response =>{
            setPlace(response.data);
        })
    }

    useEffect (() =>{
        loadPlaces()
    },[]);


    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className="container-ListAdv" >

            <div className="buscaAventura">
                <p className="tituloBranco">EXPLORE NOVAS AVENTURAS</p>
                <div className="contanierBuscar">
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
                                    value={index === selectedIndex}
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
                
                    {place.map(places =>(
                        <li className="cardAdventure" key={places.id}>
                        <div className="headerCard">
                            <IconButton color="primary">
                                <FavoriteBorderRoundedIcon style={{ color: "white" }} />
                            </IconButton>
                            <div className="precoHead">
                                <h4>{places.valueEntrance}</h4>
                            </div>
                        </div>
                        <Link className="bottonCard" to={`/localAventura/${places.id}`}>
                            <h2 style={{color:"white"}}>{places.namePlace}</h2>
                            <div className="localAdventure">
                                <RoomOutlinedIcon style={{ color: "white" }} fontSize="small" />
                                <h4>{places.city}-{places.uf}</h4>
                            </div>
                        </Link>
                    </li>
                    ))}
                
            </div>

        </div>
    )
}
