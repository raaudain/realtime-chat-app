const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

const router = require("./router");

io.on("connect", socket => {
    console.log("We have a connection");

    socket.on("join", ({name, room}, callback) => {
        console.log(name, room);

        // Used for error handling
        // if(error){
        //     callback({error: "error"});
        // }
        
    })

    socket.on("disconnect", () => {
        console.log("User has left")
    })
})

app.use(router)

server.listen(PORT, () => console.log(`*** Server has started on port ${PORT} ***`));