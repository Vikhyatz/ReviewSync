import React from 'react'

import { CiUser } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export const RoomCard = ({ room }) => {

    const convertDate = (string) => {
        const date = new Date(string);
        return date.toLocaleString()
    }

    return (
        <div className="p-4 w-fit min-w-80 group transition-all duration-150 hover:scale-105 ">
            <div className="flex rounded-lg h-full bg-gray-800 hover:bg-gray-700 transition-all duration-150 bg-opacity-60 p-8 flex-col shadow-xl shadow-blue-950 hover:shadow-2xl">
                <div className="flex items-center mb-3">
                    <h2 className="text-blue-400 text-lg title-font font-medium">{room.roomName}</h2>
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-gray-300 mt-2"><CiUser className='inline' size={20} /><span className="ml-2  font-medium text-white">Host -</span> {room.hostUser.username}</p>
                    <p className="text-sm text-gray-300 mt-2"><GoPencil className='inline' size={17} /><span className="ml-2  font-medium text-white">Created At -</span> {convertDate(room.createdAt)}</p>
                    <p className="text-sm text-gray-300 mt-2"><IoMdTime className='inline' size={20} /><span className="ml-2  font-medium text-white">Modified At -</span> {convertDate(room.updatedAt)}</p>

                    <Link to={`/room/${room._id}`} className="mt-5 text-blue-400 inline-flex items-center">Join Room <FaArrowRightLong className='ml-2 group-hover:ml-3 transition-all duration-150' /></Link>
                </div>
            </div>
        </div>
    )
}
