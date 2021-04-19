import React from 'react';

import Home from "./component/Home";
import Login from "../src/component/Login";

import HeaderComponent from "./component/HeaderComponent";
import {isLogin} from "../src/component/AllMethods";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import Todo from './component/ToDo/Todo';
const cookies = new Cookies();
const ID = cookies.get('ID');

function App() {
  return <>

    <Router>
      <HeaderComponent />
      <Switch>

        <Route exact path="/" exact component={Home} />
        <Route path="/login">
        {ID?<Redirect to="/"/>:<Login/> }
        </Route>
        
        {!ID && <Route exact path="/login" exact component={Login} />}
        <Route exact path="/todo">
          {ID?<Todo/>:<Redirect to="/login"/>}
        </Route>
        <Route path="*">
          <div style={{textAlign:"center"}}>
            <h1 style={{margin:"20px 0 20px"}}>Not Found</h1>
            <button>Go Home</button>
          </div>
        </Route>





      </Switch>
    </Router>

  </>


}

export default App;
