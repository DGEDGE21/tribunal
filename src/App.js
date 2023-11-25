import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Certidao from "./components/Certidao";
import Quitacao from "./components/Quitacao";
import Criar from "./components/Criar";
import Pedidos from "./components/Pedidos";
import Historico from "./components/Historico";
import AHome from "./components/Admin/AHome";
import APedidos from "./components/Admin/APedidos";
import Relatorios from "./components/Admin/Relatorios";
import OPedidos from "./components/operario/OPedidos";
import OHome from "./components/operario/OHome";
import ORelatorios from "./components/operario/ORelatorios";
import ODocumento from "./components/ODocumento";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import PHome from "./components/Procura/PHome";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="body">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home/Certidoes" exact component={Certidao} />
            <Route path="/home/Certidoes/quitacao" exact component={Quitacao} />
            <Route path="/home/Certidoes/pedidos" exact component={Pedidos} />
            <Route
              path="/home/Certidoes/historico"
              exact
              component={Historico}
            />
            {/*Admin */}

            <Route path="/admin/home/dash" exact component={AHome} />
            <Route path="/admin/home/pedidos" exact component={APedidos} />
            <Route path="/admin/home/relatorios" exact component={Relatorios} />
            <Route path="/criar_conta" exact component={Criar} />
            {/*Procurar Processo*/}
            <Route path="/procura/home/dash" exact component={PHome} />
            <Route path="/procura/home/dash" exact component={AHome} />

            <Route path="/procura/home/dash" exact component={AHome} />

            <Route path="/procura/home/dash" exact component={AHome} />

            {/*Operario */}

            <Route path="/opera/home/dash" exact component={OHome} />
            <Route path="/opera/home/pedidos" exact component={OPedidos} />
            <Route
              path="/opera/home/relatorios"
              exact
              component={ORelatorios}
            />

            <Route
              path="/opera/home/documento/:id"
              exact
              component={ODocumento}
            />

            <Route path="*" component={() => "404"} />
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
