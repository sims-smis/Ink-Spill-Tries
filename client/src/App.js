import React from 'react';
import './App.css'; // Ensure this file is imported
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './screens/Home';
import Room from './screens/Room';
// import {io} from 'socket.io-client';

function App() {

  // const socket = useMemo(() => io("http://localhost:5001", { withCredentials: true }), []);

  // useEffect(()=>{
  //   socket.on("connect", () => {
  //     console.log("Connected to server");
  //   });
  //   socket.on("welcome", (data) => {
  //     console.log(data);
  //   });
  // },[socket])

  return (
    <Router>
      <div style={{ color: 'white' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
