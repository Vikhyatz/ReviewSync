import axios from 'axios'
import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { CreateRoom } from '../components/CreateRoom';
import { JoinRoom } from '../components/JoinRoom'
import { RoomCard } from '../components/RoomCard'

const Dashboard = () => {
    const { user, loading } = useAuth();

    const [rooms, setRooms] = useState(null)

    // fetch rooms joined or hosted by the user
    const handleRoomsFetch = async () => {
        const userId = user._id
        try {
            const res = await axios.get(`http://localhost:5000/api/rooms/getRooms/${userId}`)
            console.log(res.data)
            setRooms(res.data.rooms)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!loading && user) {
            handleRoomsFetch();
        }
    }, [loading, user]);



    if (loading) return <Loader />;
    if (!user) return <Navigate to="/login" replace />;
    console.log(user)

    const username = user.username;

    return (
        <>
            <ToastContainer autoClose={3000}/>
            <section className={`relative h-[80vh] bg-cover bg-center bg-no-repeat bg-[url(/hero.png)] select-none`}>
                <div className="absolute inset-0 bg-black/50 bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
                        Welcome, {username.charAt(0).toUpperCase()}{username.slice(1)} 👋
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed">
                        ReviewSync helps you review code smarter — not harder.
                        Upload your code, invite collaborators, and get real-time AI-powered suggestions to improve quality, readability, and performance.
                        Whether you're debugging a tricky function or refining your next big feature, your code review starts here.
                    </p>
                </div>
            </section>

            {/* create Room component */}
            <CreateRoom updateRooms={handleRoomsFetch} toastFunc={toast} user={user} />

            {/* join room component */}
            <JoinRoom user={user} updateRooms={handleRoomsFetch}/>

            <section className="text-gray-400 bg-gray-900 body-font select-none">
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Your Review Rooms</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Access your existing sessions, join ongoing reviews, or revisit past discussions — all in one place.</p>
                    </div>
                    <div className="flex flex-wrap justify-center w-full -m-4 ">

                        {Array.isArray(rooms) ? (
                            rooms.map((room, indx) => (
                                <RoomCard key={indx} room={room} user={user} updateRooms={handleRoomsFetch} taostFunc={toast}/>
                            ))
                        ) : "loading..."
                        }
                        {Array.isArray(rooms) && rooms.length === 0 && "No Review Rooms Created :("}

                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;
