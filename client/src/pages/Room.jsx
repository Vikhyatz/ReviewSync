import axios from 'axios';
import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Loader } from "../components/Loader"

import Editor, { DiffEditor } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import { useAuth } from '../context/AuthContext';
import AccessDenied from '../components/AccessDenied';

import { io } from "socket.io-client"

import { MdEdit } from "react-icons/md";
import { FaMagic } from 'react-icons/fa';
import { ChatModal } from '../components/ChatModal';
import { toast } from 'react-toastify';

export const Room = ({ setRoomData }) => {
  const { user, loading } = useAuth();


  const modifiedModelRef = useRef(null);

  const params = useParams();
  const roomId = params.id;
  const [deets, setDeets] = useState(null)

  // loader for updating the code
  const [saveLoading, setSaveLoading] = useState(false)

  // state for Chat modal
  const [chat, setChat] = useState(false)

  // verification state
  const [authorized, setAuthorized] = useState(null)

  // socket states
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState("");

  // verify validity of room connection from the user id
  useEffect(() => {
    const userVerification = async () => {
      try {
        const res = await axios(`http://localhost:5000/api/rooms/checkUser/${user._id}/${roomId}`)
        setAuthorized(true)
      } catch (err) {
        console.log("unauthorized")
        setAuthorized(false)

      }
    }
    if (user) {
      userVerification()
    }

  }, [user])

  // socket initialization
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      // user connects
    });

    newSocket.on('codeChanged', (roomName, data) => {
      setCode(data);
    });

    newSocket.on('update', (data) => {
      setCode(data);
    });

    // join room
    newSocket.on("joinedRoom", (roomName) => {
      // roomname sent to the server from the client
    })

    newSocket.on('disconnect', () => {
      // user disconnects
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchRoomDeets = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/getInfo/${roomId}`)

        setDeets(res.data.roomData)
        // state for dynamic nav
        setRoomData(res.data.roomData)
        // when the details are fetched set the modified code to the code state
        setCode(res.data.aiReviewedCode)

      } catch (err) {
        toast.error("error fetching rooms, try again")
      }
    }
    fetchRoomDeets();
  }, [])

  useEffect(() => {
    if (socket && deets) {
      // join room
      socket.emit("joinedRoom", deets.roomId);
    }

  }, [socket, deets])



  // wait till the room details are fetched
  if (!deets) return <Loader />

  // diff editor mount configurations
  const handleEditorMount = (editor, monaco) => {
    const originalModel = monaco.editor.createModel(deets.fileText, deets.fileType);
    const modifiedModel = monaco.editor.createModel(deets.aiReviewedCode, deets.fileType);

    editor.setModel({
      original: originalModel,
      modified: modifiedModel,
    });

    modifiedModelRef.current = modifiedModel;
    setCode(modifiedModel.getValue());

    modifiedModel.onDidChangeContent(() => {
      const newValue = modifiedModel.getValue();

      // on change, socket emits the new value of code to be updated
      socket.emit("codeChanged", deets.roomId, newValue)
    });
  };

  const handleSave = async () => {
    setSaveLoading(true)

    const value = modifiedModelRef.current.getValue();

    try {
      const res = await axios.post(`http://localhost:5000/api/rooms/saveCode`, {
        code: value,
        roomId: roomId,
      })

    } catch (err) {
      toast.error("not able to update the code")
    }
    setSaveLoading(false)
  }

  if (loading) return <Loader />;
  if (!user) return <AccessDenied />;
  if (authorized == null) return <Loader />;
  if (!authorized) return <AccessDenied />;
  return (
    <>
    {chat && code !== undefined && (
  <ChatModal isOpen={chat} onClose={setChat} code={code} />
)}
      <div className='bg-gray-900 text-white flex flex-col items-center min-h-screen'>

        <button onClick={()=>{ setChat(!chat) }} className="relative px-8 py-3 bg-black text-white font-semibold rounded-lg border-2 border-blue-500 hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(59,130,246,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(59,130,246,0.4)] group my-10 w-4/5 flex items-center justify-center">
          <span className="flex items-center space-x-2">
            <FaMagic className='inline mr-2' />
            <span>AI Chat</span>
          </span>
          <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/20 to-indigo-500/20"
          ></span>
        </button>

        <div className='hidden justify-between w-4/5 text-xl lg:flex '>
          <div className='ml-5 mt-10 w-1/2 font-bold'>Original Code</div>
          <div className='ml-5 mt-10 w-1/2 font-bold flex'>
            Reviewed Code
            <div className='cursor-pointer flex justify-center items-center w-fit rounded-xl bg-blue-500 hover:bg-blue-600 transition-all duration-150 px-2 py-1 ml-4'>
              <MdEdit className='inline mr-1' />
              editable
            </div>
            <div className='cursor-pointer flex justify-center items-center w-fit rounded-xl bg-blue-500 hover:bg-blue-6600 transition-all duration-150 px-2 py-1 ml-4'>
              <FaMagic className='inline mr-2' />
              AI reviewed
            </div>
          </div>
        </div>

        <div className='w-4/5 h-4/5 overflow-hidden mt-3 rounded-3xl border-2 border-solid border-gray-700'>
          <DiffEditor
            height="90vh"
            language={deets.fileType}
            theme="vs-dark"
            onMount={handleEditorMount}
            modified={code}
            options={{
              wordWrap: "on",
              renderSideBySide: true,
              lineNumbers: "on"
            }}
          />

        </div>
        <div className='w-4/5 h-15 flex justify-end items-center'>
          <button onClick={handleSave} className="inline-flex text-white bg-blue-500 border-0 py-2 px-26 focus:outline-none hover:bg-blue-600 text-lg justify-center items-center mr-2 rounded-xl cursor-pointer">
            {saveLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>

    </>

  )
}
