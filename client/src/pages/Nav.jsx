import axios from 'axios'
import React from 'react'

import { Outlet, Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

const Nav = ({ signedIn, roomData }) => {
    const { setUser } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
            console.log(res.data)
            if (res.status == 200) {
                navigate("/login")
                setUser(null)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <header className="text-gray-400 bg-gray-900 body-font border-b-2 border-b-solid border-b-gray-700">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                        {/* logo */}
                        <img src="/logo.png" className='w-12 h-12 aspect-square rounded' />
                        {roomData ? <span className="ml-3 text-xl">Room: {roomData.roomName}</span> : <span className="ml-3 text-xl">Review-Sync</span>}

                    </Link>
                    <nav className="md:ml-auto flex md:flex-row gap-2 md:gap-0 flex-col items-center text-base justify-center">


                        {signedIn && (<>
                            {roomData && (
                                <>
                                    <p className="mr-5 hover:text-white">Host: {roomData.hostUser.username}</p>
                                    <p className="mr-5 hover:text-white">{roomData.joinedUsers.length} {roomData.joinedUsers.length == 1 ? "member" : "members"}</p>
                                </>
                            )}

                            <Link to="/dashboard" className="mr-5 hover:text-white">Dashboard</Link>
                            <button onClick={handleLogout} className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Logout
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </>
                        )}
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default Nav