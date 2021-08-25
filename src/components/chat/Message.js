import SideBar from "../task/SideBar";
import React, { useEffect, useState } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client';
import ProfileImg from '../../images/Profilen.png'
import "./Message.css"
import moment from "moment";
//import "./Join.css"

let socket;

export default function Message({ location }) {

    const [message, setMessage] = useState(null)
    const [messages, setMessages] = useState([])
    const [sideBar, setsideBar] = useState(false);
    //const names = [];

    const ENDPOINT = "localhost:5000"

    useEffect(() => {
        console.log(location)
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT)

        socket.emit("join", { username: name, room: room }, () => {

        })

        return () => {
            socket.emit("disconnect");
            socket.off();
        }
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    useEffect(() => {
        socket.on("locationMessage", (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (event) => {

        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    const sendLocation = (event) => {

        event.preventDefault();

        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser.') }
        
           
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
                socket.emit('sendLocation', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }, () => {
                   // $sendLocationButton.removeAttribute('disabled')
                    
                })
            })
    }

    const handleSideBar = () => {

        if (sideBar === true) {
            setsideBar(false)
        }
        else {
            setsideBar(true)
        }
    }
    console.log(messages)

    const MessageUser = () => {
        return (
            <div id="message-template" type="text/html">
                <div class="message">
                    <p>
                        <span class="message__name">{messages.map(message =>
                            
                            <p>{message.username} {moment(message.createdAt).format("DD MMMM, hh:mm A")} <br /> {message.text}
                            {
                               (!! message.url) ? <a href={message.url}>My Current Location</a> :  ""
                            }
                            
                            </p>
                        )}</span>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div class="chat">
                <SideBar />
                <div class="chat__main">
                    <div id="messages" class="chat__messages">
                        <MessageUser />
                    </div>

                    <div class="compose">
                        <form name="message-form" id="message-form">
                            <input type="text"
                            className ="message-input"
                                style={{ border: "1px solid black" }}
                                value={message}
                                onChange={event => setMessage(event.target.value)}
                            />
                            <button className="send-button" style={{marginRight : "10px"}} onClick={sendMessage}>Send
                            </button>

                            <button className="send-button" onClick={sendLocation}>Send Location
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="chat-mob">
                {sideBar ? <SideBar handleSideBar={handleSideBar} /> : null}

                <div className="header-top">
                    <i className="fas fa-bars" id="bars-j" onClick={handleSideBar}></i>
                    <img src={ProfileImg} className="image" alt="some text" />
                    <i className="fas fa-bell" id="bell-j"></i>

                </div>
                <div class="chat__main">
                    <div id="messages" class="chat__messages">
                        <MessageUser />
                    </div>

                    <div class="compose">
                        <form name="message-form" id="message-form">
                            <input type="text"
                                style={{ border: "1px solid black" }}
                                value={message}
                                onChange={event => setMessage(event.target.value)}
                            /><br/>
                            <button className="send-button" style={{marginRight : "10px", marginTop : "10px"}} onClick={sendMessage}>Send
                            </button>

                            <button className="send-button" style={{ marginTop : "10px"}} onClick={sendLocation}>Send Location
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}