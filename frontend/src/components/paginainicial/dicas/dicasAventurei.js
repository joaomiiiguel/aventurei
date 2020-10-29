import React from 'react';
import './dicasAventurei.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import imgCachoeira from '../../../assets/cachoeira.jpg';
import imgCamping from '../../../assets/camping.jpg';
import imgRapel from '../../../assets/rapel.jpg';

export default function DicasAventurei() {

    return (
        <div className="containerDicas">
            <p className="titulo">DICAS DO <b>AVENTUREI</b></p>
            <div className="containerDicasCard">
                <Card className="cardDicas">
                    <CardActionArea>
                    <img src={imgCachoeira} className="imgCardDicas" />
                        <CardContent>
                            <h3>O que levar na mochila?</h3>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Veja dicas de como viajar com conforto para uma viagem de ecoturismo
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button fullWidth size="small" color="primary">
                            Ver mais
                        </Button>
                    </CardActions>
                </Card>
                <Card className="cardDicas">
                    <CardActionArea>
                    <img src={imgCamping} className="imgCardDicas" />
                        <CardContent>
                            <h3>O que levar na mochila?</h3>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Veja dicas de como viajar com conforto para uma viagem de ecoturismo
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button fullWidth size="small" color="primary">
                            Ver mais
                        </Button>
                    </CardActions>
                </Card>
                <Card className="cardDicas">
                    <CardActionArea>
                    <img src={imgRapel} className="imgCardDicas" />
                        <CardContent>
                            <h3>O que levar na mochila?</h3>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Veja dicas de como viajar com conforto para uma viagem de ecoturismo
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button fullWidth size="small" color="primary">
                            Ver mais
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}
