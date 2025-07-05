import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogOut = async ()=>{
        const res = await axios.get("http://localhost:5000/api/auth/logout")
        if(res.status == 200){
            navigate("/login")
        }
    }

    return (
        <div>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    );
};

export default Logout;