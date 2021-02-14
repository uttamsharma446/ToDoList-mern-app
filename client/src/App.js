import React from 'react';

import Home from "./component/Home";
import Login from "../src/component/Login";

import HeaderComponent from "./component/HeaderComponent";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ID = cookies.get('ID');
function App() {
  return <div className="container">

    <Router>
      <HeaderComponent />
      <Switch>

        <Route exact path="/" exact component={Home} />
        {!ID && <Route exact path="/login" exact component={Login} />}
        <Route path="*">
          <div style={{textAlign:"center"}}>
            <h1 style={{margin:"20px 0 20px"}}>Not Found</h1>
            <button>Go Home</button>
          </div>
        </Route>





      </Switch>
    </Router>

  </div>


}

export default App;
