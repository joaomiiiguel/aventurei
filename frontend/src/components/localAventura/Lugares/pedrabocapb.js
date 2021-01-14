import React from 'react';
import { Link } from 'react-router-dom';
import '../localAventura.css';
//import { Carousel } from 'react-responsive-carousel';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from '@material-ui/core/Button';
import NearMeRoundedIcon from '@material-ui/icons/NearMeRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import logoTopCor from '../../../assets/LogoBranco.png';
import Footer from '../../paginainicial/footer/footer';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';




import image1 from '../../../assets/localFotos/000001.png'
import image2 from '../../../assets/localFotos/000002.png'
import image3 from '../../../assets/localFotos/000003.png'
import image4 from '../../../assets/localFotos/000004.png'


//import api from '../../services/api';

export default function pedrabocapb() {

    const responsive = {
        0: { items: 1 },
        1024: { items: 2 },
    };

    const items = [
        <div className="item" data-value="1"><img src={image1} /></div>,
        <div className="item" data-value="2"><img src={image2} /></div>,
        <div className="item" data-value="3"><img src={image3} /></div>,
        <div className="item" data-value="4"><img src={image4} /></div>,
    ];


    const places = [
        {
            "id": 1,
            "namePlace": "Pedra da Boca",
            "description": "Com uma área de 160 hectares, e situado na zona rural da cidade de Araruna, a Pedra da Boca chama atenção pelas belas paisagens. Uma das pedras tem cerca de 330 metros de altura, o local é ideal para a prática de rapel, escalada, caminhadas e acampamento. A região é apontada como o melhor local para voos de longa distância de asa delta e parapente, onde aconteceu recordes sul-americano e mundial.",
            "howtoGet": "Para ir a cachoeira o melhor acesso é por Pirpirituba e de lá pegar uma estrada de barro que segue por uns 10km até o Roncador e assim fazer uma caminhada por uma trilha leve de mais ou menos 1km.",
            "acessLevel": "Médio",
            "valueEntrance": "GRÁTIS",
            "gpsLocation": "https://goo.gl/maps/vr2Xe6f4UWeMSxFKA",
            "link": "pedra-da-boca-araruna-pb",
            "city": "Araruna ",
            "uf": "PB",
            "partnerName": "Miguel",
            "partnerInstagram": "joaomiiiguel",
            "partnerWhatsapp": "83981390385"
        }
    ]
    

    return (
        <div>
            <div className="header-menuLocal">
                <Link className="logo-top" to="/"><img src={logoTopCor} alt="fogueira" className="logoImg" /></Link>
                <Link className="beColaborador-top" to="/seja-colaborador"><h3 style={{ color: 'white' }}>Seja um Partner</h3></Link>
            </div>

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
                    <AliceCarousel
                        mouseTracking
                        autoPlay
                        autoPlayStrategy="none"
                        autoPlayInterval={1000}
                        animationDuration={1000}
                        animationType="fadeout"
                        items={items}
                        responsive={responsive}
                        disableButtonsControls
                        infinite
                        
                    />
                    
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
                            <StarIcon />
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
                    <div className="colaboradorContainer">
                        <div>
                            <h3>Local sugerido por {place.partnerName}</h3>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ display: "flex", flexDirection: "row", color: "gray" }}><InstagramIcon fontSize="small" /><p><a style={{ color: "gray", textDecoration: "none" }} href={`https://www.instagram.com/${place.partnerInstagram}`} target="_blank">@{place.partnerInstagram}</a></p></div>
                                <div style={{ display: "flex", flexDirection: "row", color: "gray", marginLeft: "5px" }}><WhatsAppIcon fontSize="small" /><p style={{ color: "gray" }}>{place.partnerWhatsapp}</p></div>
                            </div>
                        </div>
                    </div>

                </div>
            ))}


            <Footer />
        </div>
    )
}
