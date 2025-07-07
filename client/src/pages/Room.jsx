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
import React from 'react'

import Editor, { DiffEditor } from '@monaco-editor/react';

export const Room = () => {
  return (
    <>

      {/* <Editor
        height="90vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue="// some comment" /> */}
      <DiffEditor
        height="90vh"
        language="javascript"
        original="// some comment"
        modified="// that is not some comment"
        theme="vs-dark"
      />
    </>
  )
}
