import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Switch>
        <Route exact path="/">
          Friends with Auth - Home
        </Route>
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
