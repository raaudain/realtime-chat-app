const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

const router = require("./router");

app.use(cors());
app.use(router);

// Run when client connects
io.on("connect", (socket) => {
  //console.log("We have a connection");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room)

    // Welcome message to user
    socket.emit("message", {
      user: "admin",
      text: `Welcome to the ${user.room} room, ${user.name}.`,
    });

    // Announces user has joined the room
    socket
      .broadcast.to(user.room)
      .emit("message", {
        user: "admin",
        text: `${user.name} has joined the room.`,
      });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    //io.to(user.room).emit("roomData", { room: user.room, text: message });

    // Callback so we can doing something after the message is sent
    callback();
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });

      io.to(user.room).emit("roomData", {room: user.room, users: getUsersInRoom(user.room)})
    }
  });
});

server.listen(PORT, () =>
  console.log(`*** Server has started on port ${PORT} ***`)
);
