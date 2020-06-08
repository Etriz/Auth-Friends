import React, { useState } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import FriendsContext from "./contexts/FriendsContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Friends from "./components/Friends";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authFriendsToken") ? true : false
  );
  const [error, setError] = useState("");

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authFriendsToken");
  };

  return (
    <FriendsContext.Provider value={{ isLoggedIn, setIsLoggedIn, error, setError }}>
      <div className="App">
        <nav>
          <NavLink exact to="/">
            Home
          </NavLink>
          {!isLoggedIn ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <>
              <NavLink to="/friends">Friends</NavLink>
              <NavLink to="/logout" onClick={() => logout()}>
                Logout
              </NavLink>
            </>
          )}
        </nav>

        <Switch>
          <Route exact path="/">
            <h2>Friends with Auth - Home</h2>
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
