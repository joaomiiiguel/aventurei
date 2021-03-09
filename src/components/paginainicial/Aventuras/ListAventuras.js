import React, { useState } from 'react';
import './ListAventuras.css';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, InputBase, Card, CardActionArea, Divider, Button, Typography, CardMedia, CardContent, Link } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import Modal from "@material-ui/core/Modal";
import NearMeRoundedIcon from '@material-ui/icons/NearMeRounded';
import StarIcon from '@material-ui/icons/Star';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

import { Gallery, Item } from 'react-photoswipe-gallery'

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
            description: "Um dos destinos de ecoturismo mais procurados da região é a cachoeira do Roncador, localizada entre os municípios de Bananeiras e Borborema. A cachoeira que faz parte da Área de Preservação Ambiental Roncador tem aproximadamente 40 metros de altura e quedas d’água vindo do Rio Bananeiras. A melhor época do ano para usufruir desse refúgio encantador é entre maio e agosto quando a cachoeira aumenta seu volume. Para ir a cachoeira o melhor acesso é por Pirpirituba e de lá pegar uma estrada de barro que segue por uns 10km até o Roncador e assim fazer uma caminhada por uma trilha leve de mais ou menos 1km.",
            linkMaps: "https://goo.gl/maps/Fbhog7r8dwsM6ibt7",
            cidade: "Bananeiras",
            dificuldade: "Moderada",
            avaliation: "4.5",
            uf: "PB",
            like: true,
            imgCapa: require("../../../assets/localFotos/thumbnail/000001.png"),
            imgFoto: require("../../../assets/localFotos/000001.png"),
            partner_name: "João Miguel",
            partner_insta: "joaomiiiguel",
            partner_whats: "83981390385",
        },
        {
            id: 2,
            title: "Pedra da Boca",
            entrada: "Gratuito",
            description: "Com uma área de 160 hectares, e situado na zona rural da cidade de Araruna, a Pedra da Boca chama atenção pelas belas paisagens. Uma das pedras tem cerca de 330 metros de altura, o local é ideal para a prática de rapel, escalada, caminhadas e acampamento. A região é apontada como o melhor local para voos de longa distância de asa delta e parapente, onde aconteceu recordes sul-americano e mundial.",
            linkMaps: "https://goo.gl/maps/Fbhog7r8dwsM6ibt7",
            cidade: "Araruna",
            dificuldade: "Difícil",
            avaliation: "4.8",
            uf: "PB",
            like: true,
            imgCapa: require("../../../assets/localFotos/000002.png"),
            partner_name: "João Miguel",
            partner_insta: "joaomiiiguel",
            partner_whats: "83981390385",
        },
        {
            id: 3,
            title: "Praia do Guaju",
            entrada: "Gratuito",
            description: "Essa praia fica localizada na divisa entre os estados da Paraíba e o Rio Grande do Norte, está situada na cidade de Mataraca. O melhor acesso é por Sagi(RN) que fica a 2km da praia, a praia é acessível somente com buggy, 4x4 ou a pé. O rio Guaju tem uma beleza diferencial, onde é possível fazer passeio de barco pelo mangue, esquibunda nas dunas e tirolesa. E ainda comer espetinho de lagosta.",
            linkMaps: "https://goo.gl/maps/Fbhog7r8dwsM6ibt7",
            cidade: "Mataraca",
            dificuldade: "Moderada",
            avaliation: "4.5",
            uf: "PB",
            like: true,
            imgCapa: require("../../../assets/localFotos/000003.png"),
            partner_name: "João Miguel",
            partner_insta: "joaomiiiguel",
            partner_whats: "83981390385",
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
            height: 'auto',
            width: '100%',

        },
        title: {
            color: '#0F5045',
            fontWeight: 'bold'
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
            width: '100%',
            backgroundColor:'#0F5045',
            color: 'white'
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
                        <Typography className={classes.title}>
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
            <Modal open={openModal} onClose={handleClose} >
                <Grid className="ModalContainer">

                    <Grid className="containerLocal">
                        <ArrowBackIcon className="btnBack" fontSize="small" onClick={handleClose} />
                        <div className="titleLocal">
                            <h2>{idBtn.title}</h2>
                            <div style={{ display: "flex", flexDirection: "row", color: "gray" }}><RoomOutlinedIcon fontSize="small" /><p style={{ color: "gray", fontSize: '13pt' }}>{idBtn.cidade} - {idBtn.uf}</p></div>
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
                                    <h3>{idBtn.avaliation}</h3>
                                </div>

                            </div>
                        </div>
                        
                        <div className="descricaoLugar">
                            <h3>Descrição do Lugar</h3>
                            <Typography variant="body2" gutterBottom style={{ marginTop: 10, marginBottom: 10 }}>{idBtn.description}</Typography>
                        </div>
                        <Grid style={{ width: '100%', marginTop:10 }}>
                            <h4>Fotos</h4>
                            <Gallery >
                                <Item
                                    original={idBtn.imgFoto}
                                    thumbnail={idBtn.imgCapa}
                                    width="1024"
                                    height="564"

                                >
                                    {({ ref, open }) => (
                                        <img ref={ref} onClick={open} src={idBtn.imgCapa} className="PhotoThumb" />
                                    )}
                                </Item>
                                <Item
                                    original={idBtn.imgFoto}
                                    thumbnail={idBtn.imgCapa}
                                    width="1024"
                                    height="564"

                                >
                                    {({ ref, open }) => (
                                        <img ref={ref} onClick={open} src={idBtn.imgCapa} className="PhotoThumb" />
                                    )}
                                </Item>

                                
                            </Gallery>
                        </Grid>
                        <Link href={idBtn.linkMaps} target="_blank" rel="noreferrer" underline="none">
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    endIcon={<NearMeRoundedIcon />}
                                >
                                    Visualizar Rota
                                </Button>
                            </Link>

                        <Divider style={{ marginTop: 15 }} />
                        <div className="colaboradorContainer">
                            <div>
                                <h4>Local sugerido por {idBtn.partner_name}</h4>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <Link href={`https://www.instagram.com/${idBtn.partner_insta}/`} target="_blank" rel="noreferrer" underline="none" style={{ display: "flex", flexDirection: "row", color: "gray" }}><InstagramIcon fontSize="small" /><p style={{ color: "gray" }}>@{idBtn.partner_insta}</p></Link>
                                    <Link href={`https://api.whatsapp.com/send?phone=55${idBtn.partner_whats}/`} target="_blank" rel="noreferrer" underline="none" style={{ display: "flex", flexDirection: "row", color: "gray", marginLeft: "5px" }}><WhatsAppIcon fontSize="small" /><p style={{ color: "gray" }}>{idBtn.partner_whats}</p></Link>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Modal>

        </div>
    )
}


