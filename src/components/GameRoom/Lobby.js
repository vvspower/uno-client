import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router";
import StateContext from "../Context/StateContext";
import Game from "./Game/Game";

const Lobby = () => {
  const { id } = useParams();
  const context = useContext(StateContext);

  const [usersInRoom, setUsersInRoom] = useState([]);
  const [time, settime] = useState(null);
  const [started, setstarted] = useState(false);
  const navigate = useNavigate();

  console.log(time);

  console.log(context);

  useEffect(() => {
    socket.emit("join_room", { room: id });
  }, [context.user]);

  socket.on("room_updates", (data) => {
    console.log(data);
    console.log("hello");
    let users = usersInRoom;
    users.push(data);
    setUsersInRoom(data);
  });

  socket.on("start_game", (data) => {
    if (data.time === "started") {
      setstarted(true);
    }
    settime(data.time);
  });

  const leaveRoom = () => {
    socket.emit("leave_room", { room: id }, (response) => {
      if (response == "success") {
        navigate("/");
      }
    });
  };

  const startGame = () => {
    socket.emit("start_game", { room: id });
  };

  console.log(usersInRoom);

  console.log(usersInRoom[-1]?.username, context?.user.username);

  return (
    <div>
      {!started ? (
        <div>
          <div className="text-center mt-4">
            <h2 style={{ color: "#e9ecef" }}>Room {id}</h2>
            <div>
              <h5 style={{ color: "#e9ecef" }}>players connected :</h5>
              {usersInRoom.map((item, i) => {
                // return <p style={{ color: "#e9ecef" }}>{item.username}</p>;
                return (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "8px",
                      backgroundColor: "#495057",
                      maxWidth: "200px",
                      margin: "0 auto",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      height={30}
                      style={{ borderRadius: "25px" }}
                      src={item.avatar}
                    />
                    <p style={{ color: "#e9ecef", margin: "0px" }}>
                      {item.username}
                    </p>
                  </div>
                );
              })}
            </div>
            {time == null ? (
              <div>
                <button
                  onClick={leaveRoom}
                  type="button"
                  class="btn btn-danger"
                >
                  Leave Room
                </button>
                {context.user?.username ===
                usersInRoom[usersInRoom.length - 1]?.username ? (
                  <button
                    onClick={startGame}
                    type="button"
                    class="btn btn-success m-2"
                  >
                    Start Game
                  </button>
                ) : null}
              </div>
            ) : null}
            <h3>{time}</h3>
          </div>
        </div>
      ) : (
        <div>
          <Game users={usersInRoom} room={id} />
        </div>
      )}
    </div>
  );
};

export default Lobby;
