import SideBar from "../task/SideBar";
import React, {useEffect, useState} from 'react';
import queryString from 'query-string'
import io from 'socket.io-client';

let socket;

export default function Message({location}) {

    const [message, setMessage] = useState(null)
    const [messages, setMessages] = useState([])

    const ENDPOINT = "localhost:5000"

    useEffect(() => {
        console.log(location)
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT)

        socket.emit("join", {username: name, room: room}, () => {

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

    const sendMessage = (event) => {

        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }

    }

    return (
        <div className="row">
            <SideBar/>
            <div className="col-sm-8 mt-5">
                <div style={{marginTop: "3rem"}}>
                    {
                        messages.map(message => <div>
                            {message.text}
                            </div>
                        )
                    }
                </div>

                <div style={{marginTop: "30rem", marginLeft: "5rem"}}>
                    <input type="text"
                           style={{border: "1px solid black"}}
                           value={message}
                           onChange={event => setMessage(event.target.value)}
                    />
                    <button className="btn btn-sm btn-primary" style={{marginLeft: "1rem"}} onClick={sendMessage}>Send
                    </button>
                </div>
            </div>
        </div>
    )
}