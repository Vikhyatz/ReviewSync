import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

export const JoinRoom = ({user, updateRooms}) => {
    const [roomId, setRoomId] = useState("")
    
    const handleJoin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`http://localhost:5000/api/rooms/joinRoom/${roomId}/${user._id}`);
            if(res.status == 200){
                toast.success("joined the room successfully");
                updateRooms()

            }
        }catch(err){
            toast.error("wrong RoomID")
        }
    }
    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            <ToastContainer />
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Join a Review Room</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Enter a room ID to join a collaborative code review session in real time — with AI insights and peer feedback.</p>
                </div>
                <form onSubmit={handleJoin} className="flex justify-center sm:items-end items-center lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 sm:space-x-4 sm:space-y-0 space-y-4">
                    <div className="relative sm:mb-0 w-60">
                        <input
                            type="text"
                            placeholder='Room Id'
                            required
                            id="roomId"
                            name="roomId"
                            value={roomId}
                            onInput={(e)=>{setRoomId(e.target.value)}}
                            className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>

                    <button type="submit" className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg justify-center items-center ml-4">
                        Join Room
                    </button>
                </form>
            </div>
        </section>
    )
}
