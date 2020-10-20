import React from 'react'
import './paginainicial.css';
import { Grid, CssBaseline, Button, Avatar } from '@material-ui/core';

export default function paginainicial() {
    return (
        <Grid className="container-pg" >
            <CssBaseline />
            <Grid className="header-top">
                
            </Grid>
            <Grid item xs={12} sm={8} md={5} >Miguel
            <Button variant="outlined">Clique aqui</Button></Grid>
        </Grid>
    )
}
