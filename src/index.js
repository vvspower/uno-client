import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import PlayersOnline from "./components/HomePage/PlayersOnline/PlayersOnline";
import Lobby from "./components/GameRoom/Lobby";
import State from "./components/Context/State";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/room/:id",
    element: <Lobby />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <State>
      <NavBar />
      <RouterProvider router={router} />
    </State>
  </>
);

reportWebVitals();
