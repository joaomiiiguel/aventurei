import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PaginaInicial from './components/paginainicial/paginainicial';
import CadastroColaborador from './components/cadastroColaborador/cadasColaborador';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PaginaInicial} />
                <Route path="/seja-colaborador" exact component={CadastroColaborador} />
            </Switch>
        </BrowserRouter>
    )
}