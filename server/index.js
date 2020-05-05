const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const {addUser, removeUser, getUser, getUsersInRoom } = require("./users")

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

const router = require("./router");

io.on("connect", socket => {
    //console.log("We have a connection");

    socket.on("join", ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if(error){
            return callback(error);
        }

        // Welcome message to user
        socket.emit("message", {user: "chat master", text: `Welcome to the ${user.room} room, ${user.name}.`});

        // Annouces the user has joined the room
        socket.broadcast(user.room).emit("message", {user: "chat master", test: `${user.name} has joined the room.`})
        
        socket.join(user.room);

        callback();
    })

    socket.on("disconnect", () => {
        console.log(`User has left`)
    })
})

app.use(router)

server.listen(PORT, () => console.log(`*** Server has started on port ${PORT} ***`));