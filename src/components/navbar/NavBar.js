import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import StateContext from "../Context/StateContext";
import { socket } from "../socket/socket";

const NavBar = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const context = useContext(StateContext);

  const Login = async () => {
    await context.Login();
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      Login();
    }
  }, []);

  const login = async () => {
    let response = await axios.post("http://localhost:8000/api/token/", {
      email,
      password,
    });
    sessionStorage.setItem("token", response.data.access);
    window.location.reload();
  };

  if (token !== null) {
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("initialize", { token: token }, (data) => {
        console.log(data);
      });
    });

    socket.on("disconnect", (data) => {
      console.log("disconnected");
    });

    socket.on("all_users_connected", (data) => {
      let users = data.all_users;
      context.setUsersOnline([...users]);
      console.log(data);
    });
  }

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>

          <input
            value={email}
            class="form-control me-2"
            type="email"
            placeholder="email"
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            value={password}
            class="form-control me-2"
            type="password"
            placeholder="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button class="btn btn-outline-success" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
