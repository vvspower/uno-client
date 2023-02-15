import React, { useState, useReducer, useEffect, useContext } from "react";
import StateContext from "../../Context/StateContext";
import styles from "./players.module.css";

const PlayersOnline = () => {
  const [usersOnline, setUserOnline] = useState([]);
  const context = useContext(StateContext);

  const [force, forceUpdate] = useReducer((x) => x + 1);

  return (
    <div className={styles.container}>
      <h3>Players online</h3>
      <div>
        {context.usersOnline.map((item, i) => {
          return (
            <div className={styles.user}>
              <img src={item.avatar} />
              <p>{item.username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayersOnline;
