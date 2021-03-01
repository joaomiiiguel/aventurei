import React, { useState, useEffect } from 'react';
import './ListAventuras.css';
import { makeStyles } from '@material-ui/core/styles';
import { Box, InputBase, Card, CardActionArea, CardActions, Button, Typography, CardMedia, CardContent } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Modal from "@material-ui/core/Modal";
import LocalAVenture from '../../localAventura/localAventura'

import imageCapa from '../../../assets/localFotos/000001.png'
import imageCapa2 from '../../../assets/localFotos/000002.png'

export default function ListAventuras(props) {
    const estados = ["Brasil", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [idBtn, setidBtn] = useState([]);
    const [openModal, setOpenModal] = useState(false);

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
            image: "../../../assets/localFotos/000001.png",
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

    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
            display: "flex",
            margin: 10,
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
                        image={imageCapa}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {place.title}
                        </Typography>
                        <Box className={classes.flexRow}>
                            <RoomOutlinedIcon fontSize="small" style={{ color: "gray" }}/>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {place.cidade} - {place.estado}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>

            </Card>
        </div>
    );

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
                {ListaCards}
            </div>

            {/**Modal com detalhes do lugar */}
            <Modal open={openModal} onClose={handleClose}>
                <div className="ModalContainer">
                    <LocalAVenture/>
                </div>
            </Modal>

        </div>
    )
}


