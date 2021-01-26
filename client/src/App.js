import React from 'react';

import Home from "./component/Home";

import HeaderComponent from "./component/HeaderComponent";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return <div className="container">

    <Router>
      <HeaderComponent/>
      <Switch>

        <Route path="/" exact component={Home} />
        




      </Switch>
    </Router>

  </div>


}

export default App;
