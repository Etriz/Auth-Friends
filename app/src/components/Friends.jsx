import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import FriendsContext from "../contexts/FriendsContext";

const Friends = () => {
  const [friendsList, setFriendsList] = useState([]);
  const [newFriend, setNewFriend] = useState({ id: Date.now(), name: "", age: "", email: "" });
  const { error, setError } = useContext(FriendsContext);

  const getData = () => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        console.log("friends list", res);
        setFriendsList(res.data);
      })
      .catch((err) => {
        // console.log('friends list error',err);
        setError(err.response.data.error);
      });
  };

  const handleChange = (e) => {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/friends", newFriend)
      .then((res) => {
        // console.log(res);
        setFriendsList(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(
    () => {
      getData();
    },
    //eslint-disable-next-line
    []
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Add New Friend
        <label htmlFor="name">
          Name
          <input type="text" id="name" name="name" value={newFriend.name} onChange={handleChange} />
        </label>
        <label htmlFor="age">
          Age
          <input type="text" id="age" name="age" value={newFriend.age} onChange={handleChange} />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={newFriend.email}
            onChange={handleChange}
          />
        </label>
        <button>Add Friend</button>
      </form>
      {friendsList.length !== 0 ? (
        friendsList.map((item) => {
          return (
            <div key={item.id} className="card">
              <p>
                {item.name} {item.email}
              </p>
            </div>
          );
        })
      ) : (
        <h4>{error}</h4>
      )}
    </div>
  );
};

export default Friends;
