// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Alert, NavBar, Card, Row, Column } from './widgets';
import {ArticleList, ArticleDetails} from "./components/articles";
import {Create} from "./components/create";
import {EditList, EditDetails} from "./components/edit";

import './style.css';
import { createHashHistory } from 'history';
import NavDropdown from "react-bootstrap/esm/NavDropdown";


const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (

      <NavBar brand="Nyhetsside" bg="primary" variant="dark">
        <NavBar.Link to="/Forside">Home</NavBar.Link>
        <NavBar.Link to="/Nyheter">Nyheter</NavBar.Link>
        <NavBar.Link to="/Sport">Sport</NavBar.Link>
        <NavBar.Link to="/Kultur">Kultur</NavBar.Link>
        <NavBar.Link to="/Teknologi">Teknologi</NavBar.Link>
        <NavBar.Link to="/opprett">Opprett ny artikkel</NavBar.Link>
        <NavBar.Link to="/edit">Endre/slett artikkel</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Nyhetsside"></Card>;
  }
}


/*
            <p className="marquee">
                <span>Overskrift1, tidspunkt - Overskrift2, tidspunkt - Overskrift3, tidspunkt</span></p>
 */
/* ::::::::::::::::: */

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
          <Switch>
          <Route exact path="/opprett" component={Create} />
          <Route exact path="/edit" component={EditList} />
          <Route exact path="/edit/:id" component={EditDetails} />
          <Route path="/nyhetssaker/:id" component={ArticleDetails} />
          <Route path="/:kategori" component={ArticleList} />
          </Switch>
      </div>
    </HashRouter>,
    root
  );
