import React, { useState, useEffect } from 'react';
import './ListAventuras.css';
import { makeStyles } from '@material-ui/core/styles';
import { Box, InputBase, Card, CardActionArea, Divider, Button, Typography, CardMedia, CardContent, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Modal from "@material-ui/core/Modal";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NearMeRoundedIcon from '@material-ui/icons/NearMeRounded';


import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';



export default function ListAventuras(props) {
    const estados = ["Brasil", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [idBtn, setidBtn] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const aventurasApi = [
        {
            id: 1,
            title: "Cachoeira do Roncador",
            entrada: "Gratuito",
            description: "Um dos destinos de ecoturismo mais procurados da região é a cachoeira do Roncador, localizada entre os municípios de Bananeiras e Borborema. A cachoeira que faz parte da Área de Preservação Ambiental Roncador tem aproximadamente 40 metros de altura e quedas d’água vindo do Rio Bananeiras. A melhor época do ano para usufruir desse refúgio encantador é entre maio e agosto quando a cachoeira aumenta seu volume",
            gpsLocationY: 21123,
            gpsLocationZ: 21123,
            cidade: "Bananeiras",
            dificuldade: "Moderada",
            avaliation: "4.5",
            uf: "PB",
            like: true,
            imgCapa: require("../../../assets/localFotos/000001.png"),
            partner_name: "João Miguel",
            partner_insta: "joaomiiiguel",
            partner_whats: "83981390385",
        },
        {
            id: 2,
            title: "Cachoeira do Pinga",
            image: require("../../../assets/localFotos/000001.png"),
            entrada: "R$30",

            cidade: "Bananeiras",
            uf: "PB",
            like: true
        },
        {
            id: 3,
            title: "Cachoeira do Altar",
            image: "../assets/cachoeira-do-roncador.jpg",
            entrada: "Gratuita",
            cidade: "Bananeiras",
            uf: "PB",
            like: true
        },
        {
            id: 4,
            title: "Cachoeira do Altar",
            image: "../assets/cachoeira-do-roncador.jpg",
            entrada: "R$45",
            cidade: "Bananeiras",
            uf: "PB",
            like: true
        },
    ]

    const useStyles = makeStyles({
        root: {
            maxWidth: 300,
            display: "flex",
            justifyContent: "center",
            margin: 10,
            borderRadius: 20
        },
        media: {
            height: 350,
            width: 350,

        },
        text: {
            color: '#0F5045'
        },
        CardContent: {
            width: '100%',
            position: 'absolute',
            bottom: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)'
        },
        flexRow: {
            display: 'flex',
            alignItems: 'center'
        },
        formControl: {
            margin: 2,
            minWidth: 120,
        },

        button: {
            marginTop: 15,
            width: "100%",
        }

    });
    const classes = useStyles();

    const handleOpenModal = (place) => {
        setidBtn(place);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };


    const ListaCards = aventurasApi.map((place) =>
        <div>
            <Card className={classes.root} onClick={() => handleOpenModal(place)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={place.imgCapa}
                        title={place.title}
                    />
                    <CardContent>
                        <Typography variant="subtitle1">
                            {place.title}
                        </Typography>
                        <Box className={classes.flexRow}>
                            <RoomOutlinedIcon fontSize="small" style={{ color: "gray" }} />
                            <Typography variant="body2" color="textSecondary" component="p">
                                {place.cidade} - {place.uf}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>

            </Card>
        </div>
    );

    const handleMenuItemClick = (event) => {
        setSelectedIndex(event.target.value);
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


                    {/**Modal com detalhes do lugar */}
                    <div className="formBottom">
                        <select className="custom-select" >
                            {estados.map((option, index) => (
                                <option
                                    className="optionItem"
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
                {ListaCards}
            </div>

            {/**Modal com detalhes do lugar */}
            <Modal open={openModal} onClose={handleClose}>
                <div className="ModalContainer">

                    <img src={idBtn.imgCapa} className="imgCapa" />
                    <div className="containerLocal">
                        <div className="titleLocal">
                            <div>
                                <h1>{idBtn.title}</h1>
                                <div style={{ display: "flex", flexDirection: "row", color: "gray" }}><RoomOutlinedIcon fontSize="small" /><p style={{ color: "gray" }}>{idBtn.cidade} - {idBtn.uf}</p></div>
                            </div>
                            <Link className="likeLocal" to="#">
                                <FavoriteBorderRoundedIcon />
                            </Link>
                        </div>
                        <Divider />

                        <div className="localInfos">
                            <div className="nivelAcesso">
                                <h4 style={{ color: "gray" }}>Dificuldade</h4>
                                <h4>{idBtn.dificuldade}</h4>
                            </div>
                            <div className="entradaPreco">
                                <h4 style={{ color: "gray" }}>Acesso</h4>
                                <h4>{idBtn.entrada}</h4>
                            </div>
                            <div className="avaliacaoLocal">
                                <h4 style={{ color: "gray" }}>Avaliação</h4>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <StarIcon />
                                    <h3 style={{ color: "gray" }}>{idBtn.avaliation}</h3>
                                </div>

                            </div>
                        </div>
                        <div className="descricaoLugar">
                            <h3>Descrição do Lugar</h3>
                            <p>{idBtn.description}</p>

                            <Button
                            variant="contained"
                            className={classes.button}
                            endIcon={<NearMeRoundedIcon />}
                        >
                            Visualizar Rota
                                </Button>

                        </div>

                        
                        <div className="colaboradorContainer">
                            <div>
                                <h4>Local sugerido por {idBtn.partner_name}</h4>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div style={{ display: "flex", flexDirection: "row", color: "gray" }}><InstagramIcon fontSize="small" /><p style={{ color: "gray" }}>@{idBtn.partner_insta}</p></div>
                                    <div style={{ display: "flex", flexDirection: "row", color: "gray", marginLeft: "5px" }}><WhatsAppIcon fontSize="small" /><p style={{ color: "gray" }}>{idBtn.partner_whats}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}


