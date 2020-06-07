import React, { useState, useContext } from "react";

import axiosWithAuth from "../utils/axiosWithAuth";
import FriendsContext from "../contexts/FriendsContext";

const CreateAccount = (props) => {
  const [createLogin, setCreateLogin] = useState({ createUsername: "", createPassword: "" });
  const { error, setError } = useContext(FriendsContext);

  const handleChange = (e) => {
    setCreateLogin({ ...createLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // axiosWithAuth()
    //   .post("create new account here")
    //   .then((res) => console.log(res))
    //   .catch((err) => {
    //     console.log(err);
    //     setError(err.response.data.error);
    //   });
    props.history.push("/login");
  };

  return (
    <div>
      Create Account
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            name="username"
            value={createLogin.createUsername}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            value={createLogin.createPassword}
            onChange={handleChange}
          />
        </label>
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
