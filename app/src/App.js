import React, { useState } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import FriendsContext from "./contexts/FriendsContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Friends from "./components/Friends";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authFriendsToken");
  };

  return (
    <FriendsContext.Provider value={{ setIsLoggedIn, error, setError }}>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          {!isLoggedIn ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/friends">Friends</Link>
              <Link to="/logout" onClick={() => logout()}>
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
          <Route path="/create" component={CreateAccount} />
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
