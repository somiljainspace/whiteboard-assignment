import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import WhiteboardCanvas from './components/WhiteboardCanvas';
import Toolbox from './components/Toolbox';
import SaveLoadControls from './components/SaveLoadControls';

const ENDPOINT = "http://localhost:4000"; // Replace with your server endpoint

function App() {
  const [response, setResponse] = useState("");
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const canvasRef = useRef(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('FromAPI', data => {
      setResponse(data);
    });

    // Cleanup the socket connection when the component unmounts
    return () => socket.disconnect();
  }, []); // Ensure useEffect runs only once by passing an empty dependency array

  const handleSave = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    localStorage.setItem('whiteboard', dataURL);
    alert('Whiteboard saved!');
  };

  const handleLoad = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const dataURL = localStorage.getItem('whiteboard');
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      context.drawImage(img, 0, 0);
    };
  };

  return (
    <div className='App'>
      <h1>Whiteboard Canvas</h1>
      <p>WebSocket message: {response}</p>
      <Toolbox setTool={setTool} setColor={setColor} />
      <WhiteboardCanvas ref={canvasRef} tool={tool} color={color} />
      <SaveLoadControls onSave={handleSave} onLoad={handleLoad} />
    </div>
  );
}

export default App;
