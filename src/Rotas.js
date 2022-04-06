import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Login from "./pages/Login/Login";
import { Tabela } from "./pages/Tabela";

function Rotas(props) {
  return (
    <div {...props}>
      <div>
        <Switch>
          <Route path="/home" exact> <Home/> </Route>
          <Route path="/info" exact> <Info/> </Route>
          <Route path="/tabela" exact> <Tabela/> </Route>
          <Route path="/login" exact> <Login/> </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Rotas;