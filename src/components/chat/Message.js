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
    const [rooms, setRooms] = useState([]);
    const [sideBar, setsideBar] = useState(false);
    //const names = [];

    const ENDPOINT = "https://umesh-chat-app.herokuapp.com/"

    useEffect(() => {
        function getMessage() {
            const { name, room } = queryString.parse(location.search);

            socket = io(ENDPOINT)

            socket.emit("join", { username: name, room: room }, () => {

            })

            return () => {
                socket.disconnect();
                socket.off();
            }
        }
        getMessage();

        //eslint-disable-next-line react-hooks/exhaustive-deps

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    useEffect(() => {
        socket.on("locationMessage", (message) => {
            setMessages([...messages, message])
        })

        socket.on('roomData', ({ room }) => {
            setRooms([...rooms, room])
        })

    }, [rooms,messages])


    const sendMessage = (event) => {

        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    const sendLocation = (event) => {

        event.preventDefault();

        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser.')
        }


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
    

    const MessageUser = () => {
        return (
            <div id="message-template" type="text/html">
                <div className="message">
                    <div>
                        <span className="message__name">{messages.map(message =>

                            <p>{message.username} {moment(message.createdAt).format("DD MMMM, hh:mm A")} <br /> {message.text}
                                {
                                    (!!message.url) ? <a href={message.url}>My Current Location</a> : ""
                                }

                            </p>
                            
                        )}</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="chat">
                <SideBar chatroom= {rooms} />
                <div className="chat__main">
                    <div id="messages" className="chat__messages">
                        <MessageUser />
                    </div>

                    <div className="compose">
                        <form name="message-form" id="message-form">
                            <input type="text"
                                className="message-input"
                                style={{ border: "1px solid black" }}
                                value={message? message : "" }
                                onChange={event => setMessage(event.target.value)}
                            />
                            <button className="send-button" style={{ marginRight: "10px" }} onClick={sendMessage}>Send
                            </button>

                            <button className="send-button" onClick={sendLocation}>Send Location
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="chat-mob">
                {sideBar ? <SideBar handleSideBar={handleSideBar} chatroom= {rooms}  /> : null}

                <div className="header-top">
                    <i className="fas fa-bars" id="bars-j" onClick={handleSideBar}></i>
                    <img src={ProfileImg} className="image" alt="some text" />
                    <i className="fas fa-bell" id="bell-j"></i>

                </div>
                <div className="chat__main">
                    <div id="messages" className="chat__messages">
                        <MessageUser />
                    </div>

                    <div className="compose">
                        <form name="message-form" id="message-form">
                            <input type="text"
                                style={{ border: "1px solid black" }}
                                value={message? message : "" }
                                onChange={event => setMessage(event.target.value)}
                            /><br />
                            <button className="send-button" style={{ marginRight: "10px", marginTop: "10px" }} onClick={sendMessage}>Send
                            </button>

                            <button className="send-button" style={{ marginTop: "10px" }} onClick={sendLocation}>Send Location
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}