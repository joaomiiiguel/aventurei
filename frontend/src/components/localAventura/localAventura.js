import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './localAventura.css';
//import { Carousel } from 'react-responsive-carousel';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from '@material-ui/core/Button';
import NearMeRoundedIcon from '@material-ui/icons/NearMeRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import logoTopCor from '../../assets/LogoBranco.png';
import Footer from '../paginainicial/footer/footer.js';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import img01 from '../../assets/localFotos/000001.png';
import img02 from '../../assets/localFotos/000002.png';
import img03 from '../../assets/localFotos/000003.png';
import img04 from '../../assets/localFotos/000004.png';
import img05 from '../../assets/localFotos/000005.png';


export default function localAventura() {



    return (
        <div>
            <div className="header-menuLocal">
                <Link className="logo-top" to="/"><img src={logoTopCor} alt="fogueira"   className="logoImg" /></Link>
                <Link className="beColaborador-top" to="/seja-colaborador"><h3 style={{ color: 'white' }}>Seja um Colaborador</h3></Link>
            </div>
            <div className="local-Aventura">
                <div className="titleLocal">
                    <div>
                        <h1>Cachoeira do Roncador</h1>
                        <div style={{display:"flex",flexDirection:"row", color:"gray"}}><RoomOutlinedIcon fontSize="small"/><p style={{color:"gray"}}>Bananeiras, Paraíba</p></div>
                    </div>
                    <Link className="likeLocal">
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
                        <h2 style={{ color: "green", fontSize: "20pt" }}>FÁCIL</h2>
                        <h3 style={{ color: "gray" }}>ACESSO</h3>
                    </div>
                    <div className="entradaPreco">
                        <h2 style={{ fontSize: "20pt" }}>GRATUITA</h2>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi quis commodo odio aenean. Facilisis volutpat est velit egestas dui id ornare arcu odio. Viverra nam libero justo laoreet sit amet cursus sit. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Velit aliquet sagittis id consectetur purus. Vel pharetra vel turpis nunc eget. Et odio pellentesque diam volutpat commodo sed egestas egestas. Sit amet consectetur adipiscing elit ut aliquam purus sit. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Nam at lectus urna duis convallis. Sit amet mauris commodo quis imperdiet massa. Sed odio morbi quis commodo odio aenean sed adipiscing diam. Tempus urna et pharetra pharetra massa. Eget nulla facilisi etiam dignissim diam quis enim.
                    Eu consequat ac felis donec et odio. Quam vulputate dignissim suspendisse in est ante. A arcu cursus vitae congue mauris rhoncus. Posuere ac ut consequat semper viverra. Consequat nisl vel pretium lectus quam id. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed risus pretium quam vulputate dignissim suspendisse. Porttitor eget dolor morbi non arcu. Orci sagittis eu volutpat odio. Sed vulputate mi sit amet mauris.
                    Dolor magna eget est lorem ipsum dolor. Augue ut lectus arcu bibendum at varius vel pharetra vel. Aliquet nec ullamcorper sit amet risus nullam eget felis. Condimentum mattis pellentesque id nibh tortor id. Adipiscing elit ut aliquam purus sit amet.</p>
                </div>
                <div className="comoChegar">
                    <div>
                        <h2>Como chegar</h2>
                        <p style={{ textAlign: "justify" }}>Eu consequat ac felis donec et odio. Quam vulputate dignissim suspendisse in est ante. A arcu cursus vitae congue mauris rhoncus. Posuere ac ut consequat semper viverra. Consequat nisl vel pretium lectus quam id. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed risus pretium quam vulputate dignissim suspendisse. Porttitor eget dolor morbi non arcu. Orci sagittis eu volutpat odio. Sed vulputate mi sit amet mauris.
                        Dolor magna eget est lorem ipsum dolor. Augue ut lectus arcu bibendum at varius vel pharetra vel. Aliquet nec ullamcorper sit amet risus nullam eget felis. Condimentum mattis pellentesque id nibh tortor id. Adipiscing elit ut aliquam purus sit amet. arcu cursus vitae congue mauris rhoncus. Posuere ac ut consequat semper viverra.
                        Consequat nisl vel pretium lectus quam id. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed risus pretium quam vulputate dignissim suspendisse. Porttitor eget dolor morbi non arcu. </p>
                    </div>
                    <div className="btRota">
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth="true"
                            endIcon={<NearMeRoundedIcon/>}
                        >
                            OBTER ROTA
                        </Button>
                    </div>

                </div>
                <div class="colaboradorContainer">
                    <div className="avatarColab"></div>
                    <div>
                        <h3>Local sugerido por João Miguel</h3>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <div style={{display:"flex",flexDirection:"row", color:"gray"}}><InstagramIcon fontSize="small"/><p style={{color:"gray"}}>@joaomiiiguel</p></div>
                            <div style={{display:"flex",flexDirection:"row", color:"gray", marginLeft:"5px"}}><WhatsAppIcon fontSize="small"/><p style={{color:"gray"}}>(83) 99999-9999</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
