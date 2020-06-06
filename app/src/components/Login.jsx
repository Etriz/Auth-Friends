import React, { useState, useContext } from "react";

import axiosWithAuth from "../utils/axiosWithAuth";
import FriendsContext from "../contexts/FriendsContext";

const Login = (props) => {
  const [inputValues, setInputValues] = useState({ username: "", password: "" });
  const { setIsLoggedIn } = useContext(FriendsContext);

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/login", inputValues)
      .then((res) => {
        console.log(res);
        localStorage.setItem("authFriendsToken", res.data.payload);
        setIsLoggedIn(true);
        props.history.push("/friends");
      })
      .catch((err) => {
        // console.log(err.response);
        console.error("login error -", err.response.data.error);
      });
    return;
  };

  return (
    <div>
      Login Page
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            name="username"
            value={inputValues.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            value={inputValues.password}
            onChange={handleChange}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
