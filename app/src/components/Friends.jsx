import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import FriendsContext from "../contexts/FriendsContext";

const Friends = () => {
  const [friendsList, setFriendsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newFriend, setNewFriend] = useState({ id: Date.now(), name: "", age: "", email: "" });
  const { error, setError } = useContext(FriendsContext);

  const getData = () => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        console.log("friends list", res);
        setFriendsList(res.data);
        setIsLoading(false);
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
        // console.log("friends response", res);
        setFriendsList(res.data);
      })
      .catch((err) => console.log(err));
  };
  const deleteFriend = (id) => {
    console.log("id", id);
    // axiosWithAuth()
    //   .delete(`/friends/${id}`)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        {/* <h3>Add New Friend</h3> */}
        <label htmlFor="name">
          <span>Name</span>
          <input type="text" id="name" name="name" value={newFriend.name} onChange={handleChange} />
        </label>
        <label htmlFor="age">
          <span>Age</span>
          <input type="text" id="age" name="age" value={newFriend.age} onChange={handleChange} />
        </label>
        <label htmlFor="email">
          <span>Email</span>
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
      {isLoading && <h3>Loading ...</h3>}
      <div className="cardGroup">
        {friendsList.length !== 0 ? (
          friendsList.map((item) => {
            return (
              <div key={item.id} className="card">
                <p>{item.name}</p>
                <hr />
                <p>
                  {`Age: ${item.age}`}
                  <br />
                  {item.email}
                </p>
                <div className="deleteFriend" onClick={deleteFriend(item.id)}>
                  Delete
                </div>
              </div>
            );
          })
        ) : (
          <h4>{error}</h4>
        )}
      </div>
    </div>
  );
};

export default Friends;
