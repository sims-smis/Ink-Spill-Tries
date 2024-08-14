import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../contexts/SocketContext";
// import { io } from "socket.io-client";

export default function Home() {
  // const { socket } = useSocket();
  // const socket = useMemo(
  //   () => io("http://localhost:5001", { withCredentials: true }),
  //   []
  // );
  const {socket, socketId} = useSocket();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setName(e.target.value);
  };
  // console.log("hhelooo",socketId);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to server");
  //   });
  //   socket.on("welcome", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //   console.log(name);
    // navigate to the room page
    console.log(name);
    socket.emit("join_room", "room1");
    navigate("/room");
  };
  return (
    <>
      <div className="App flex flex-col items-center justify-center min-h-screen ">
        <h1 className=" font-bold text-5xl m-8" style={{ color: "#FFFFFF" }}>
          Welcome to Ink-Spill
        </h1>
        <div>
          <input
            className=" w-64 h-8 rounded-sm text-black"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleChange}
          />
          <button
            className=" m-8 h-8 rounded-lg w-28 bg-green-300"
            onClick={handleSubmit}
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
}
