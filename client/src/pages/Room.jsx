// import axios from 'axios';
// import React from 'react'
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom'
// import { Loader } from './Loader';

// export const Room = () => {
//   const params = useParams();
//   const roomId = params.id;
//   const [deets, setDeets] = useState(null)

//   useEffect(() => {
//     const fetchRoomDeets = async () => {
//       try{
//         const res = await axios.get(`http://localhost:5000/api/rooms/getInfo/${roomId}`)
//         console.log(res.data)
//         setDeets(res.data.roomData)
//       }catch(err){
//         console.log(err)
//       }
//     }
//     fetchRoomDeets();
//   }, [])

//   if(!deets) return <Loader />

//   return (
//     <>
//     <div className='mt-10'>room: {params.id}</div>
//     <div>roomName: {deets.roomName}</div>
//     <textarea readOnly className='mt-10 border-amber-700 border-2 border-solid' name="data" id="data" rows={10} cols={100} value={deets.fileText}>
//     </textarea>
//     </>


//   )
// }
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Loader } from "../components/Loader"

import Editor, { DiffEditor } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import { useAuth } from '../context/AuthContext';
import AccessDenied from '../components/AccessDenied';

export const Room = ({ setRoomData }) => {
  const { user, loading } = useAuth();

  

  const params = useParams();
  const roomId = params.id;
  const [deets, setDeets] = useState(null)

  useEffect(() => {
    const fetchRoomDeets = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/getInfo/${roomId}`)
        console.log(res.data)
        setDeets(res.data.roomData)
        setRoomData(res.data.roomData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRoomDeets();
  }, [])

  if (!deets) return <Loader />

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

  if (loading) return <Loader />;
  if (!user) return <AccessDenied />

  return (
    <>
      <div className='bg-gray-900 text-white flex flex-col items-center h-[calc(100vh-88px)]'>
        <div className='hidden justify-between w-4/5 text-xl lg:flex '>
          <div className='ml-5 mt-10 w-1/2 font-bold'>Original Code</div>
          <div className='ml-5 mt-10 w-1/2 font-bold'>Reviewed Code <span className='rounded-2xl bg-[#264D80] px-2 py-1 ml-4'>editable</span><span className='rounded-2xl bg-[#264D80] px-2 py-1 ml-4'>AI reviewed</span></div>
        </div>
        <div className='w-4/5 h-4/5 overflow-hidden mt-3 rounded-3xl border-2 border-solid border-gray-700'>
          <DiffEditor
            height="90vh"
            language="text/javascript"
            original={deets.fileText}
            modified={newCode}
            theme="vs-dark"
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
