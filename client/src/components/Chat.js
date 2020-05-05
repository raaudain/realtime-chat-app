import React, {useState, useEffect} from 'react';
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input"
import Messages from './Messages';

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]); // array for storage messages

    const ENDPOINT = "localhost:5000";

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        // Connect
        socket.emit("join", {name, room}, () => {
            
        });

        // Disconnect
        return () => {
            socket.emit("disconnect");

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    // Listening for message
    useEffect(() => {
        socket.on("message", message => {
            setMessages([...messages, message])
        });
    }, [messages]);

    const sendMessage = event => {
        event.preventDefault();

        if(message){
            socket.emit("sendMessage", message, () => setMessage(""))
        }
    }

    return (
        <div className="outerContainer">
            <h1>Chat</h1>
            <InfoBar room={room} />
            <Messages messages={messages} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
   
        </div>
    );
}

export default Chat;