// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import {HashRouter, NavLink, Route, Switch} from 'react-router-dom';
import { Alert, NavBar, Card, Row, Column } from './widgets';
import {ArticleList, ArticleDetails} from "./components/articles";
import {Create} from "./components/create";
import {EditList, EditDetails} from "./components/edit";
import './style.css';
import { createHashHistory } from 'history';


const history = createHashHistory(); // Use history.push(...) to programmatically change path

class Menu extends Component {
  render() {
    return (
         <NavBar brand="Nyhetsside">
            <NavBar.Link to="/Forside">Forside</NavBar.Link>
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

class Logo extends Component{
    render() {
        return (
            <div className="header">
                <img className="logo" src="https://www.sjoliv.no/wp-content/uploads/2019/02/sjo_hytte-e1551283902288.jpg" alt="Logo" />
            </div>
        );
    }
}

class Home extends Component {
  render() {
    return(
        <NavLink activeStyle={{ color: 'black' }} exact to={'/Forside'}>
            <Card title="Nyhetsside"></Card>
        </NavLink>
  );

  }
}

class Footer extends Component{
    render() {
        return (
            <footer className="footer">
             <p>Made by Andine Luick</p>
            </footer>
        );
    }

}


/* ::::::::::::::::: */

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Logo />
        <Menu />
        <Alert />
        <Switch>
          <Route exact path="/opprett" component={Create} />
          <Route exact path="/edit" component={EditList} />
          <Route exact path="/edit/:id" component={EditDetails} />
          <Route path="/nyhetssaker/:id" component={ArticleDetails} />
          <Route path="/:kategori" component={ArticleList} />
        </Switch>
        <Footer/>
      </div>
    </HashRouter>,
    root
  );
