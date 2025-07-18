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

const newCode = `const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const authRouter = require('./router/auth-router')
const dotenv = require('dotenv')
const connectDB = require('./utils/db')

// Load environment variables
dotenv.config()

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the updated version!');
});

app.use('/api/auth', authRouter);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("🚀 Server is listening at http://localhost:PORT");
  });
}).catch((err) => {
  console.error('❌ Failed to connect to DB:', err);
});
`

export const Room = ({ setRoomData }) => {
  const { user, loading } = useAuth();


  const modifiedModelRef = useRef(null);


  const params = useParams();
  const roomId = params.id;
  const [deets, setDeets] = useState(null)

  // socket states
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState("");

  // socket emits
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server:', newSocket.id);
    });

    newSocket.on('codeChanged', (roomName, data) => {
      console.log("code changed")
      setCode("data");
    });

    newSocket.on('update', (data) => {
      console.log("code update")
      setCode(data);
    });

    // join room
    newSocket.on("joinedRoom", (roomName) => {
      console.log("sent roomName from the client", roomName)
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchRoomDeets = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/getInfo/${roomId}`)
        console.log(res.data)

        setDeets(res.data.roomData)
        // state for dynamic nav
        setRoomData(res.data.roomData)
        // when the details are fetched set the modified code to the code state
        setCode(newCode)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRoomDeets();
  }, [])

  useEffect(() => {
    if(socket && deets){
      console.log("in here")
      // join room
    socket.emit("joinedRoom", deets.roomId);
    }
    
  }, [socket, deets])
  


  // wait till the room details are fetched
  if (!deets) return <Loader />

  // diff editor mount configurations
  const handleEditorMount = (editor, monaco) => {
    const originalModel = monaco.editor.createModel(deets.fileText, deets.fileType);
    const modifiedModel = monaco.editor.createModel(code, deets.fileType);

    editor.setModel({
      original: originalModel,
      modified: modifiedModel,
    });

    modifiedModelRef.current = modifiedModel;

    modifiedModel.onDidChangeContent(() => {
      const newValue = modifiedModel.getValue();
      console.log('Modified content changed:', newValue);

      // on change, socket emits the new value of code to be updated
      socket.emit("codeChanged", deets.roomId, newValue)
    });
  };


  if (loading) return <Loader />;
  if (!user) return <AccessDenied />
  console.log(deets.fileType)
  return (
    <>
      <div className='bg-gray-900 text-white flex flex-col items-center h-[calc(100vh-88px)]'>
        <div className='hidden justify-between w-4/5 text-xl lg:flex '>
          <div className='ml-5 mt-10 w-1/2 font-bold'>Original Code</div>
          <div className='ml-5 mt-10 w-1/2 font-bold flex'>
            Reviewed Code
            <div className='cursor-pointer flex justify-center items-center w-fit rounded-xl bg-[#264D80] hover:bg-[#719bd2] transition-all duration-150 px-2 py-1 ml-4'>
              <MdEdit className='inline mr-1' />
              editable
            </div>
            <div className='cursor-pointer flex justify-center items-center w-fit rounded-xl bg-[#264D80] hover:bg-[#719bd2] transition-all duration-150 px-2 py-1 ml-4'>
              <FaMagic className='inline mr-2' />
              AI reviewed
            </div>
          </div>
        </div>

        <div className='w-4/5 h-4/5 overflow-hidden mt-3 rounded-3xl border-2 border-solid border-gray-700'>
          <DiffEditor
            height="90vh"
            // language="text/javascript"
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
      </div>

    </>

  )
}
