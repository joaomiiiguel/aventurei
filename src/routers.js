import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PaginaInicial from './components/paginainicial/paginainicial';
import CadastroColaborador from './components/cadastroColaborador/cadasColaborador';
import Cachoeira10dicas from './components/posts/cachoeira10dicas';
import PrimeiroCamping from './components/posts/primeirocamping';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PaginaInicial} />
                <Route path="/seja-colaborador" component={CadastroColaborador} />
                <Route path="/cachoeira-10-dicas-de-segurança" component={Cachoeira10dicas} />
                <Route path="/camping-8-dicas-do-primero-camping" component={PrimeiroCamping} />
            </Switch>
        </BrowserRouter>
    )
}