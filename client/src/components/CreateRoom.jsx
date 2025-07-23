import React from 'react'

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import roomSchema from '../../lib/validations/roomSchema';
import { useState, useRef } from 'react';

import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';
import LoadingModal from './LoadingModal';

export const CreateRoom = ({updateRooms, toastFunc, user}) => {
    const [loading, setLoading] = useState(false)
    // RHK and yup resolver integration
    const methods = useForm({
        resolver: yupResolver(roomSchema)
    });
    const { register, handleSubmit, setValue, formState: { errors } } = methods;


    const [file, setFile] = useState(null);
    const ref = useRef();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setValue("file", e.target.files[0], { shouldValidate: true });
    };

    const handleUpload = async (data) => {
        setLoading(true)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('roomName', data.roomName)
        formData.append('userId', user._id)

        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status == 200) {
                toastFunc.success("the room was created successfully")
                updateRooms()
            }
        } catch (err) {
            console.error('Upload error:', err);
            toastFunc.error("not able to create room")
        }
        setLoading(false)
    };
    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            {loading ? <LoadingModal /> : ""}
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Create a New Review Room</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Upload your code and instantly start a real-time, AI-assisted review session with peers.</p>
                </div>
                <form onSubmit={handleSubmit(handleUpload)} className="flex justify-center sm:items-end items-center lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 sm:space-x-4 sm:space-y-0 space-y-4">
                    <div className="relative sm:mb-0 w-60">
                        <input
                            type="text"
                            placeholder='Room Name'
                            {...register("roomName")}
                            id="roomName"
                            name="roomName"
                            className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        {errors.roomName && <p className="text-red-500 text-sm">{errors.roomName.message}</p>}
                    </div>

                    <div className="relative sm:mb-0 w-60 flex flex-col">
                        <div onClick={() => ref.current.click()} className="inline-flex text-white bg-blue-500 border-0 py-2 w-full px-6 focus:outline-none hover:bg-blue-600 rounded text-lg justify-center items-center cursor-pointer">
                            {file ? <p className="truncate w-30">{file.name}</p> : "Upload File"}
                            <FaCloudUploadAlt size={24} className="ml-3" />
                        </div>

                        <input
                            type="file"
                            id="file"
                            className="hidden"
                            ref={ref}
                            onChange={handleFileChange}
                        />
                        {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
                    </div>

                    <button type="submit" className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg justify-center items-center ml-4">
                        {loading ? "Reviewing Code..." : "Create Room"}
                    </button>
                </form>
            </div>
        </section>
    )
}
