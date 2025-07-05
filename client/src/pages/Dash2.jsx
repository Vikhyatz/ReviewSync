import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

const Dash2 = () => {
    const [user, setUser] = useState("hello");

    useEffect(() => {
      const fetchUserDeets = async () => {
        console.log("helo there")
        const res = await axios.get("http://localhost:5000/api/auth/me", {
            withCredentials: true
        })
        console.log(res)
        setUser(res.data.user.username);
      }
      fetchUserDeets();
    }, [])
    
    return (
        <>
        <h1>Dash2</h1>
        <p>{user}</p>
        </>
        
    )
}

export default Dash2