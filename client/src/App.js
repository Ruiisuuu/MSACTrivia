import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() =>{
    const ws = new WebSocket('ws://localhost:5000');
    ws.onopen = () => {
      console.log('Connected to server!');
    }
    ws.onmessage = (event) => {
      console.log(event.data);
    }
  }, []);

  return (
    <div className="App">
      <h1>
        Welcome to trivia night
      </h1>
    </div>
  );
}

export default App;
