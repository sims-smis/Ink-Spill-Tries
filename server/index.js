import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
// import cors from "cors";

// NOTE: IN THIS APPLICATION, SERVER IS AT PORT 5001 AND CLIENT SERVER IS AT PORT ____

var app = express();
const httpServer = createServer(app);
const port = 5001;
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow specific HTTP methods
    credentials: true, // Allow credentials
  },
});

app.get("/", function (req, res) {
  res.send("Hello Simmu");
});

io.on("connection", (socket)=>{
    console.log("User connected",socket.id);

    socket.on("join_room", (room)=>{
        socket.join(room);
        console.log(`${socket.id} has joined the room`);
    });

    socket.on("drawing", ({offsetX, offsetY, room})=>{
      // console.log("drawing");
      io.to(room).emit("drawingClient",{offsetX, offsetY});
    })
      
    socket.on("startDraw", ({offsetX, offsetY, room})=>{
      // console.log("startDraw");
      io.to(room).emit("startDrawClient",{offsetX, offsetY});
    });

    socket.on("stopDraw", ({room})=>{
      // console.log("stopDraw");
      io.to(room).emit("stopDrawClient");
    });

    socket.on("eraseAllEvent", ({room})=>{
      io.to(room).emit("eraseAllClient");
    })

    socket.on("eraseNowEvent", ({room})=>{
      io.to(room).emit("eraseNowClient");
    })

    socket.on("lineWidthEvent", ({newLineWidth, room})=>{
      io.to(room).emit("lineWidthClient", newLineWidth);
    })

    socket.on("drawNowEvent", ({room})=>{
      io.to(room).emit("drawNowClient");
    })

    socket.on("disconnect", () => {
        console.log("user disconnected",socket.id);
    });
    // socket.emit("welcome", "Welcome to the server");
})

httpServer.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});