import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("authFriendsToken");
  // const token = "esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ";

  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: token,
    },
  });
};
export default axiosWithAuth;
