import React from 'react';
import './ListAventuras.css';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, Card, CardActionArea, CardActions, Button, Typography, CardMedia, CardContent } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';


import imageCapa from '../../../assets/localFotos/000001.png'
import imageCapa2 from '../../../assets/localFotos/000002.png'

export default function ListAventuras(props) {
    const estados = ["Brasil", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    
    const places = [
        {
            "id": 1,
            "namePlace": "Pedra da Boca",
            "link": "pedra-da-boca-araruna-pb",
            "city": "Araruna",
            "uf": "PB",
            "imgCapa": "000001",
            "valueEntrance": "Gratis"
        },
        {
            "id": 2,
            "namePlace": "Cachoeira do Roncador",
            "link": "cachoeira-roncador-bananeiras-pb",
            "imgCapa": "000002",
            "city": "Bananeiras",
            "uf": "PB",
        },
        {
            "id": 3,
            "namePlace": "Cachoeira do Roncador",
            "link": "cachoeira-roncador-bananeiras-pb",
            "imgCapa": "000003",
            "city": "Bananeiras",
            "uf": "PB",
        },
        {
            "id": 4,
            "namePlace": "Cachoeira do Roncador",
            "link": "cachoeira-roncador-bananeiras-pb",
            "imgCapa": "000004",
            "city": "Bananeiras",
            "uf": "PB",
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
            
            color: 'white'
        },
        CardContent: {
            width: '100%',
            position:'absolute',
            bottom: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)'
        }
    });



    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const classes = useStyles();
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
                {/*Lista dos Cards*/}
                {places.map(place => (
                    <Card className={classes.root} key={place.id}>
                        <CardActionArea>
                            <Link to={`/detalhes-lugar/${place.link}`}>
                            <CardMedia
                                className={classes.media}
                                
                            >
                                <img src={`./static/media/${place.imgCapa}.28b93523.png`}/>
                                <img src={imageCapa2}/>
                                <CardContent className={classes.CardContent}>
                                    <Typography className={classes.text} gutterBottom variant="h5" component="h3">
                                        {place.namePlace}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="p">
                                        {place.city}-{place.uf}
                                    </Typography>
                                </CardContent>
                            </CardMedia>
                            </Link>
                        </CardActionArea>
                    </Card>

                ))}
            </div>

        </div>
    )
}


