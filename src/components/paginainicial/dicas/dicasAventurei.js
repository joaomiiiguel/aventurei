import React from 'react';
import './dicasAventurei.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import imgCachoeira from '../../../assets/blogImagens/thumbnail/cachoeira10dicas.png';
import imgCamping from '../../../assets/blogImagens/thumbnail/camping8dicas.png';

export default function DicasAventurei() {

    return (
        <div className="containerDicas">
            <p className="titulo">DICAS DO <b>AVENTUREI</b></p>
            <div className="containerDicasCard">
                <Card className="cardDicas">
                    <img src={imgCachoeira} alt="imagem cachoeira" className="imgCardDicas" />
                    <CardContent>
                        <h3 style={{ color: '#0F5045' }}>Cachoeira: 10 dicas de segurança que fazem a diferença em seu passeio</h3>
                    </CardContent>
                    <CardActions>
                        <Link
                            className="linkButton"
                            to="/cachoeira-10-dicas-de-segurança"
                        >
                            <Button style={{backgroundColor:'#0F5045', width: '100%', color:'white'}}>
                                Ver mais
                            </Button>
                        </Link>
                    </CardActions>
                </Card>

                <Card className="cardDicas">
                    <img src={imgCamping} alt="imagem cachoeira" className="imgCardDicas" />
                    <CardContent>
                        <h3 style={{ color: '#0F5045' }}>Camping: veja 8 dicas para quem vai acampar pela primeira vez</h3>
                    </CardContent>
                    <CardActions>
                        <Link
                            className="linkButton"
                            to="/camping-8-dicas-do-primero-camping"
                        >
                            <Button style={{backgroundColor:'#0F5045', width: '100%', color:'white'}}>
                                Ver mais
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}
