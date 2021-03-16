import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ReactGA from 'react-ga';
import PaginaInicial from './components/paginainicial/paginainicial';
import CadastroColaborador from './components/cadastroColaborador/cadasColaborador';
import Cachoeira10dicas from './components/posts/cachoeira10dicas';
import PrimeiroCamping from './components/posts/primeirocamping';
import EcoturismoDicas from './components/posts/ecoturismo6dicas';



ReactGA.initialize('G-4FYB3V9GT4');


export default function Routes(){

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search)
    }, [])

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PaginaInicial} />
                <Route path="/seja-nosso-guia" component={CadastroColaborador} />
                <Route path="/cachoeira-10-dicas-de-segurança" component={Cachoeira10dicas} />
                <Route path="/camping-8-dicas-do-primero-camping" component={PrimeiroCamping} />
                <Route path="/ecoturismo-6-dicas-aproveitar-melhor" component={EcoturismoDicas} />
            </Switch>
        </BrowserRouter>
    )
}