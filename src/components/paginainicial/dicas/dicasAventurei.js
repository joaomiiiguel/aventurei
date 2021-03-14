import React from 'react';
import './dicasAventurei.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import imgCachoeira from '../../../assets/blogImagens/thumbnail/cachoeira10dicas.png';
import imgCamping from '../../../assets/camping.jpg';
import imgRapel from '../../../assets/rapel.jpg';

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

                        <Button fullWidth size="large" style={{backgroundColor:'#0F5045'}}>
                            <Link
                                className="linkButton"
                                to="/cachoeira-10-dicas-de-segurança"
                            >
                                Ver mais
                            </Link>
                        </Button>

                    </CardActions>
                </Card>
            </div>
        </div>
    )
}
