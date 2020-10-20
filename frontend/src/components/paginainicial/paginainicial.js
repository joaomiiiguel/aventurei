import React from 'react'
import './paginainicial.css';
import 'fontsource-roboto';
import { Grid, CssBaseline, Button, Avatar } from '@material-ui/core';

import logoTop from '../../assets/LogoBranco.png'

export default function paginainicial() {
    return (
        <Grid  className="container-pg" >
            <Grid className="container-top">

                <Grid className="header-menu">
                    <Grid className="logo-top"><img src={logoTop} className="logoImg"/></Grid>
                    <Grid className="beColaborador-top">Seja um Colaborador</Grid>
                </Grid>

                <Grid className="header-msg">
                    <h1 className="text-Slogan">Encontre o melhor destino para sua aventura</h1>
                    <Button size="large" variant="contained">Explore novas aventuras</Button>
                </Grid>
                
            </Grid>
        </Grid>
    )
}
