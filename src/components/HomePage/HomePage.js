import React, { useState, useEffect } from "react";
import PlayersOnline from "./PlayersOnline/PlayersOnline";
import styles from "./home.module.css";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import StateContext from "../Context/StateContext";

const HomePage = () => {
  const navigate = useNavigate();
  const [room, setroom] = useState("");
  const context = useContext(StateContext);

  const leaveRooms = () => {};

  const createRoom = () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    socket.emit("create_room", { room: r }, (room) => {
      navigate(`/room/${room}`);
    });
  };

  console.log(context, "hello");

  // USE CHAT GPT FOR HELP PLEASE

  const joinRoom = () => {
    navigate(`/room/${room}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.createRoom}>
        <div className={styles.modals}>
          <main>
            <h3>Create / Join a Room</h3>
            <div>
              <div className={styles.btns}>
                <button
                  onClick={createRoom}
                  type="button"
                  class="btn btn-secondary"
                >
                  Create
                </button>
                <button
                  onClick={joinRoom}
                  type="button"
                  class="btn btn-secondary"
                >
                  Join
                </button>
              </div>
              <div>
                <input
                  value={room}
                  onChange={(e) => {
                    setroom(e.target.value);
                  }}
                  type="text"
                />
              </div>
            </div>
          </main>
          <main>
            <h3>Matchmaking</h3>
            <button type="button" class="btn btn-secondary">
              Start
            </button>
          </main>
        </div>
      </div>
      <div>
        <PlayersOnline />
      </div>
    </div>
  );
};

export default HomePage;
