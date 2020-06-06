import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Friends = () => {
  const [friendsList, setFriendsList] = useState([]);

  const getData = () => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        console.log("friends", res);
        setFriendsList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      Friends List Here
      {friendsList.length !== 0
        ? friendsList.map((item) => {
            return (
              <div key={item.id}>
                <p>{item.name}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Friends;
