import { createContext } from "react";
import React, { useState } from "react";
import StateContext from "./StateContext";
import axios from "axios";

const State = (props) => {
  const [user, setuser] = useState({});
  const [usersOnline, setUsersOnline] = useState([]);

  const Login = async () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    let response = await axios.post("http://localhost:8000/login/");
    setuser(response.data);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        Login,
        usersOnline,
        setUsersOnline,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default State;
