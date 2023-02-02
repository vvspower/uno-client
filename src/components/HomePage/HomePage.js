import React from "react";
import PlayersOnline from "../PlayersOnline/PlayersOnline";
import styles from "./home.module.css";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const createRoom = () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    navigate(`/room/${r}`);
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Create / Join a Room</h2>
        <div>
          <button onClick={createRoom} type="button" class="btn btn-light">
            Create
          </button>
          <button type="button" class="btn btn-light">
            Join
          </button>
        </div>
      </div>

      <div>
        <PlayersOnline />
      </div>
    </div>
  );
};

export default HomePage;
