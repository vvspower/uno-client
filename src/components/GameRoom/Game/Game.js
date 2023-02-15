import React, { useEffect, useState, useContext } from "react";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import StateContext from "../../Context/StateContext";
import styles from "./game.module.css";
import skip from "../../../assets/skip.png";
import draw2 from "../../../assets/draw2.png";
import reverse from "../../../assets/reverse.png";
import draw4 from "../../../assets/draw4.png";
import wild from "../../../assets/wild.png";
import { keys } from "localforage";

export const socket = io("http://127.0.0.1:8000/game");

const Game = (props) => {
  const context = useContext(StateContext);
  const [cardInPlay, setcardInPlay] = useState(null);
  const [userCards, setuserCards] = useState(null);
  const [userCardsKeys, setuserCardsKeys] = useState([]);
  const [userCardsValues, setuserCardsValues] = useState([]);

  console.log(userCards);

  useEffect(() => {
    socket.emit("assign_cards", { users: props.users }, (deck) => {
      setuserCards(deck);
      let keys = Object.keys(deck);
      setuserCardsKeys(keys);
      let values = Object.values(deck);
      setuserCardsValues(values);
    });
  }, []);

  console.log("hello");

  const renderSwitch = (item) => {
    console.log(item);
    switch (item) {
      case "skip":
        return (
          <img style={{ padding: "15px 5px", marginTop: "10px" }} src={skip} />
        );
      case "draw2":
        return (
          <img style={{ padding: "15px 5px", marginTop: "10px" }} src={draw2} />
        );
      case "reverse":
        return (
          <img
            style={{ padding: "15px 5px", marginTop: "10px" }}
            src={reverse}
          />
        );
      case "draw4":
        return (
          <img style={{ padding: "15px 5px", marginTop: "10px" }} src={draw4} />
        );
      case "wild":
        return (
          <img style={{ padding: "15px 5px", marginTop: "10px" }} src={wild} />
        );
      default:
        return <p>{item}</p>;
    }
  };

  return (
    <div>
      <div className={styles.opponents}>
        {userCardsKeys.map((item, i) => {
          console.log(item, "players");

          return (
            <div className={styles.opponent_player}>
              <div style={{ display: "flex", gap: "10px" }}>
                {item !== context.user.username
                  ? userCards[item].map((item, i) => {
                      console.log(item);
                      return (
                        <p
                          style={{
                            backgroundColor: "black",
                          }}
                        >
                          {"uno"}
                        </p>
                      );
                    })
                  : null}
              </div>
              {item !== context.user.username ? (
                <span
                  style={{
                    backgroundColor: "#495057",
                    color: "#e9ecef",
                    padding: "5px 10px",
                    borderRadius: "10px",
                  }}
                >
                  {item}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className={styles.middle}>
        <div className={styles.deck}>
          <p>deck</p>
        </div>
        <div className={styles.active_cards}>
          <p>cards</p>
        </div>
      </div>
      <div className={styles.player}>
        <div className={styles.cards}>
          {userCards
            ? userCards[context.user.username].map((item, i) => {
                return (
                  <div
                    className={styles.card}
                    style={{
                      backgroundColor: item.split("_")[0],
                    }}
                  >
                    {renderSwitch(item.split("_")[1])}
                  </div>
                );
              })
            : null}
        </div>
        <div className={styles.player_info}>
          {userCards ? (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  backgroundColor: " #495057",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  maxWidth: "130px",
                  margin: "0 auto",
                  marginTop: "10px",
                }}
              >
                <img height={30} width={30} src={context.user.avatar} />
                <h6 style={{ color: "#e9ecef", margin: "0px" }}>
                  {context.user.username}
                </h6>
              </div>
              <h5
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  color: "#e9ecef",
                }}
              >
                {userCards[context.user.username].length} cards left
              </h5>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Game;
