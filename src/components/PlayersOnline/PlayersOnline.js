import React, { useState, useReducer, useEffect } from "react";
import { useImmer } from "use-immer";
// import { Socket } from "socket.io";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { socket } from "../socket/socket";

const PlayersOnline = () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1MzQ1ODAyLCJpYXQiOjE2NzUyNTk0MDIsImp0aSI6IjI4N2ZmZDAxYTZkNjRhYWM4YTJkZDU4YjkxOGQ5NmI3IiwidXNlcl9pZCI6MTF9.njeWksOUU_eyleYFyG_O-SdKzXf7myrBOAJi6FbcZHw";

  const [usersOnline, setUserOnline] = useState([]);
  const [force, forceUpdate] = useReducer((x) => x + 1);

  // const socket = io("ws://0.0.0.0:8000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("initialize", { token: token }, (data) => {
        console.log(data);
      });
    });

    socket.on("connection", (data) => {
      let users = usersOnline;
      users.push(data.user);
      setUserOnline([...users]);
      console.log(data);
    });
  }, []);

  console.log("D");

  return (
    <div>
      PlayersOnline
      <div>
        {usersOnline.map((item, i) => {
          return <h4>{item}</h4>;
        })}
      </div>
    </div>
  );
};

export default PlayersOnline;
