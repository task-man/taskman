import { Link } from "react-router-dom";
import React, { useState } from 'react';
import SideBar from "../task/SideBar";
import ProfileImg from '../../images/Profilen.png'
import "./Join.css"

export default function Join() {
    const [name, setName] = useState(null);
    const [room, setRoom] = useState(null);
    const [sideBar, setsideBar] = useState(false);

    const handleSideBar = () => {

        if (sideBar === true) {
            setsideBar(false)
        }
        else {
            setsideBar(true)
        }
    }

    return (
        <div>
            <div className="join-container">
                <SideBar />
                <div className="join-grid">
                    <div className="mt-2">
                    <label>Display name</label>
                        <input type="text" placeholder="Username" aria-label="Username"
                        value={name}
                        onChange={event => setName(event.target.value)}
                         />
                    </div>
                    
                    <div className="mt-2">
                    <label>Room</label>
                        <input
                            value={room}
                            style={{ border: "1px solid black" }}
                            className="join-input"
                            onChange={event => setRoom(event.target.value)}
                            placeholder="Enter room"
                        />
                    </div>
                    <div className="mt-2">
                        <Link onClick={event => (!name || !room) ? event.preventDefault() : null}
                            to={`/chat?name=${name}&room=${room}`}>
                            <button className="join-room" >Join Room</button>
                        </Link>
                    </div>
                </div>

            </div>
            <div className="join-container-mob">
                {sideBar ? <SideBar handleSideBar={handleSideBar} /> : null}

                <div className="header-top">
                    <i className="fas fa-bars" id="bars" onClick={handleSideBar}></i>
                    <img src={ProfileImg} className="image" alt="some text" />
                    <i className="fas fa-bell" id="bell"></i>

                </div>
                <div className="join-grid">
                    <div className="mt-2">
                    <label>Display name</label>
                        <input type="text" placeholder="Username" aria-label="Username"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        aria-describedby="basic-addon1" />
                    </div>
                    
                    <div className="mt-2">
                    <label>Room</label>
                        <input
                            value={room}
                            className="ml-2"
                            onChange={event => setRoom(event.target.value)}
                            placeholder="Enter room"
                        />
                    </div>
                    <div className="mt-2">
                        <Link onClick={event => (!name || !room) ? event.preventDefault() : null}
                            to={`/chat?name=${name}&room=${room}`}>
                            <button >Join Room</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}