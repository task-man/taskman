import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import SideBar from "../task/SideBar";

export default function Join() {
    const [name, setName] = useState(null);
    const [room, setRoom] = useState(null);

    return (
        <div className="row mt-8">
            <SideBar/>
            <di className="col-sm-7">
                <h3 className="text-primary">Join Room</h3>
                <div className="mt-2">
                    <input
                        value={name}
                        style={{border: "1px solid black"}}
                        className="ml-2"
                        placeholder="Enter username"
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <input
                        value={room}
                        style={{border: "1px solid black"}}
                        className="ml-2"
                        onChange={event => setRoom(event.target.value)}
                        placeholder="Enter room"
                    />
                </div>
                <div className="mt-2">
                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null}
                          to={`/chat?name=${name}&room=${room}`}>
                        <button className="btn btn-sm btn-outline-success">Join Room</button>
                    </Link>
                </div>
            </di>

        </div>
    )
}