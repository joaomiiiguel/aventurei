import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './localAventura.css';
//import { Carousel } from 'react-responsive-carousel';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from '@material-ui/core/Button';
import NearMeRoundedIcon from '@material-ui/icons/NearMeRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';


//import api from '../../services/api';

export default function LocalAventura(props) {
    const [places, setPlaces] = useState([]);
    const [partner, setPartner] = useState([]);


   

    useEffect(() => {
       
    }, []);



    
    return (
        <div>
            {places.map(place => ( 
                <div className="local-Aventura" key={place.id}>
                    <div className="titleLocal">
    
                        <div>
                            <h1>{place.namePlace}</h1>
                            <div style={{ display: "flex", flexDirection: "row", color: "gray" }}><RoomOutlinedIcon fontSize="small" /><p style={{ color: "gray" }}>{place.city}, {place.uf}</p></div>
                        </div>
                        <Link className="likeLocal" to="#">
                            <FavoriteBorderRoundedIcon />
                            <h3 className="likeLocalTxt">SALVAR</h3>
                        </Link>
                    </div>
                    <div className="localInfos">
                        <div className="nivelAcesso">
                            <div className="cardAcesso">
                                <div className="boxAcesso" style={{ border: "1px solid green", backgroundColor: "green" }} ></div>
                                <div className="boxAcesso" style={{ border: "1px solid orange" }}></div>
                                <div className="boxAcesso" style={{ border: "1px solid red" }}></div>
                            </div>
                            <h2 style={{ color: "green", fontSize: "20pt" }}>{place.acessLevel}</h2>
                            <h3 style={{ color: "gray" }}>ACESSO</h3>
                        </div>
                        <div className="entradaPreco">
                            <h2 style={{ fontSize: "20pt" }}>{place.valueEntrance}</h2>
                            <h3 style={{ color: "gray" }}>ENTRADA</h3>
                        </div>
                        <div className="avaliacaoLocal">
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <h3 style={{ color: "gray" }}>AVALIAÇÃO</h3>
                        </div>
                    </div>
                    <div className="descricaoLugar">
                        <h2>Descrição do Lugar</h2>
                        <p>{place.description}</p>
                    </div>
                    <div className="comoChegar">
                        <div>
                            <h2>Como chegar</h2>
                            <p style={{ textAlign: "justify" }}>{place.howtoGet}</p>
                        </div>
                        <div className="btRota">
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<NearMeRoundedIcon />}
                            >
                                OBTER ROTA
                        </Button>
                        </div>

                    </div>
                    {partner.map(partners => (
                        <div className="colaboradorContainer" key={partners.id}>
                            <div>
                                <h3>Local sugerido por {partners.name}</h3>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div style={{ display: "flex", flexDirection: "row", color: "gray" }}><InstagramIcon fontSize="small" /><p style={{ color: "gray" }}>@{partners.instagram}</p></div>
                                    <div style={{ display: "flex", flexDirection: "row", color: "gray", marginLeft: "5px" }}><WhatsAppIcon fontSize="small" /><p style={{ color: "gray" }}>{partners.whatsapp}</p></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
