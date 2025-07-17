import React, { useEffect, useRef, useState } from 'react'

import { CiUser } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export const RoomCard = ({ room, user, updateRooms, taostFunc }) => {

    const [dropDown, setDropdown] = useState(false)
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const convertDate = (string) => {
        const date = new Date(string);
        return date.toLocaleString()
    }

    const handleRemove = async (roomId) => {
        try{
            const res = await axios.post(`http://localhost:5000/api/rooms/removeRoom/${roomId}/${user._id}`);
            if(res.status == 200){
                taostFunc.success("room removed successfully!")
                updateRooms();
            }
        }catch(err){
            taostFunc.error("not able to remove the room")
        }
    }

    return (
        <>
        <div className="p-4 w-fit min-w-80 group transition-all duration-150 hover:scale-105 ">
            <div className="flex rounded-lg h-full bg-gray-800 hover:bg-gray-700 transition-all duration-150 bg-opacity-60 p-8 flex-col shadow-xl shadow-blue-950 hover:shadow-2xl">
                <div className="flex items-center mb-3 justify-between">
                    <h2 className="text-blue-400 text-lg title-font font-medium select-none">{room.roomName}</h2>
                    <div className='relative' ref={dropdownRef}>
                        <div onClick={(e)=>{e.preventDefault(); setDropdown(!dropDown)}} className='cursor-pointer p-2'><BsThreeDotsVertical size={20}/></div>
                        {
                            dropDown && (
                                <div className='rounded-md w-40 h-fit absolute cursor-pointer bg-[#262626] -right-4 p-2 flex flex-col gap-3 mt-1 outline-1 outline-gray-600 items-center'>
                                    <Link to={`/room/${room._id}`} className='w-[99%] text-white select-none rounded-sm hover:bg-white/30 p-2'>Join Room</Link>
                                    <div onClick={(e)=>{e.preventDefault();handleRemove(room._id)}} className='w-[99%] select-none rounded-sm text-red-400 p-2 hover:bg-red-400/30'>
                                    Leave Room
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>
                <div className="flex-grow select-none">
                    <p className="text-sm text-gray-300 mt-2"><CiUser className='inline' size={20} /><span className="ml-2  font-medium text-white">Host -</span> {room.hostUser.username}</p>
                    <p className="text-sm text-gray-300 mt-2"><GoPencil className='inline' size={17} /><span className="ml-2  font-medium text-white">mime type -</span> {room.fileType}</p>
                    <p className="text-sm text-gray-300 mt-2"><GoPencil className='inline' size={17} /><span className="ml-2  font-medium text-white">Created At -</span> {convertDate(room.createdAt)}</p>
                    

                    <Link to={`/room/${room._id}`} className="mt-5 text-blue-400 inline-flex items-center">Join Room <FaArrowRightLong className='ml-2 group-hover:ml-3 transition-all duration-150' /></Link>
                </div>
            </div>
        </div>
        </>
    )
}
