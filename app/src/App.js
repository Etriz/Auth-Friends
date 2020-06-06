import React, { useState } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import FriendsContext from "./contexts/FriendsContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Friends from "./components/Friends";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <FriendsContext.Provider value={{ setIsLoggedIn }}>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          {!isLoggedIn ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/friends">Friends</Link>
              <Link to="/logout" onClick={() => setIsLoggedIn(false)}>
                Logout
              </Link>
            </>
          )}
        </nav>

        <Switch>
          <Route exact path="/">
            Friends with Auth - Home
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/logout">
            <Redirect to="/login" />
          </Route>
          <PrivateRoute path="/friends" component={Friends} />
        </Switch>
      </div>
    </FriendsContext.Provider>
  );
}

export default App;
