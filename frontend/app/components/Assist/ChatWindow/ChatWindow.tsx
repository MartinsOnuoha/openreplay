import React, { useState, useEffect } from 'react';
import { IconButton } from 'UI';
import VideoContainer from '../components/VideoContainer';
import stl from './chatWindow.css';
import { callPeer } from 'App/player';

interface Props {
  call: (oStream: MediaStream, cb: (iStream: MediaStream)=>void)=>void
}

function ChatWindow({ call }: Props) {
  const [ inputStream, setInputStream ] = useState<MediaStream | null>(null);
  const [ outputStream, setOutputStream ] = useState<MediaStream | null>(null);

  useEffect(() => {
    startOutputStream()
    callPeer()
  }, [])

  const startOutputStream = () => {
    navigator.mediaDevices.getUserMedia({video:true, audio:true})
    .then(oStream => {
      setOutputStream(oStream);
      call(oStream, setInputStream); // Returns false when unable to connect.
                  // TODO: handle calling state
    })
    .catch(console.log) // TODO: handle error in ui
  }

  // const onCallClick = () => {
  //   navigator.mediaDevices.getUserMedia({video:true, audio:true})
  //   .then(oStream => {
  //     setOutputStream(oStream);
  //     call(oStream, setInputStream); // Returns false when unable to connect.
  //                 // TODO: handle calling state
  //   })
  //   .catch(console.log) // TODO: handle error in ui
  // }
  return (
    <div className="fixed border radius bg-white z-50 shadow-xl mt-16">
      <div className="p-2">
        <VideoContainer stream={ inputStream } />
        <div className="py-1" />
        <VideoContainer stream={ outputStream } muted/>
        {/* <div className="cursor-pointer p-2 mr-2">
          <IconButton icon="telephone" size="20"  onClick={ onCallClick }/>
        </div> */}
      </div>
    </div>
  )
}

export default ChatWindow