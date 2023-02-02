import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket/socket";

const GameRoom = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log("i have mounted");
    socket.emit("join_room", { room: id });
    socket.on("join_room", (data) => {
      console.log(`${data.user} joined the room`);
    });
  }, []);

  return (
    <div>
      <div className="text-center mt-4">
        <h2>Room {id}</h2>
        <p>players connected : </p>
      </div>
    </div>
  );
};

export default GameRoom;
