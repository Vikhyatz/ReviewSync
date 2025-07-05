import axios from 'axios'
import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify'

import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const ref = useRef();

    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadedUrl(res.data.filePath);
        } catch (err) {
            console.error('Upload error:', err);
        }
    };

    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Access Denied</p>;
    console.log(user)
    const username = user.username

    return (
        <>
            <ToastContainer autoClose={3000} />
            <section className="text-gray-400 bg-gray-900 body-font h-fit">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Welcome, {username.charAt(0).toUpperCase()}{username.slice(1)} 👋
                        </h1>
                        <p className="mb-8 leading-relaxed">ReviewSync helps you review code smarter — not harder.
                            Upload your code, invite collaborators, and get real-time AI-powered suggestions to improve quality, readability, and performance.
                            Whether you're debugging a tricky function or refining your next big feature, your code review starts here.</p>
                        <form onSubmit={handleUpload} className="flex justify-center">
                            <div onClick={() => { ref.current.click() }} className="inline-flex text-white bg-blue-500 border-0 py-2 w-50 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg justify-center items-center ">
                                {file ? <p className='truncate w-30'>{file.name}</p> : "Upload File" }
                                
                                <FaCloudUploadAlt size={24} className='ml-3' />
                                </div>
                            <input type="file" hidden ref={ref} id="input" onChange={handleFileChange} />
                            <button type="submit" className='inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg justify-center items-center ml-4'>Continue</button>
                        </form>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded" alt="hero" src="./hero.png" />
                    </div>
                </div>
            </section>
        </>

    )
}

export default Dashboard