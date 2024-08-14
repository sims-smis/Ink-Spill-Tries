// import React, { useEffect, useRef, useState } from "react";
// import "./DrawingCanvas.css";
// // import { io } from 'socket.io-client'; //step 1;
// // import socket from "../../socket";
// import { useSocket } from "../../contexts/SocketContext";

// export default function DrawingCanvas() {
//   const canvasRef = useRef(null);
//   const canvasContextRef = useRef(null);

//   const [isDrawing, setIsDrawing] = useState(false);
//   const [lineWidth, setLineWidth] = useState(5);

//   const {socket, socketId} = useSocket();
//   // const socket = useRef(null);  // step 2;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return; // Ensure canvas is not null
//     canvas.width = 600;
//     canvas.height = 600;

//     const context = canvas.getContext("2d");
//     if (!context) return; // Ensure context is not null
//     context.lineCap = "round";
//     context.strokeStyle = "black";
//     context.lineWidth = lineWidth; // Set initial lineWidth
//     canvasContextRef.current = context;

//     // socket.current = io('http://localhost:5001', { withCredentials: true });
//     socket.on('drawing', ({ x0, y0, x1, y1 }) => {
//       draw();
//     });
//     socket.current.on('startDraw', () => {
//       startDrawing();
//     });
//     socket.current.on('stopDraw', () => {
//       stopDrawing();
//     });
//     // return () => {
//     //   socket.current.disconnect();
//     // };
// },[]);

//   const startDrawing = ({ nativeEvent }) => {
//     if (!canvasContextRef.current) return; // Check if context is available
//     const { offsetX, offsetY } = nativeEvent;
//     canvasContextRef.current.beginPath();
//     canvasContextRef.current.moveTo(offsetX, offsetY);
//     canvasContextRef.current.lineTo(offsetX, offsetY);
//     canvasContextRef.current.stroke();
//     setIsDrawing(true);
//     nativeEvent.preventDefault();
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing || !canvasContextRef.current) return; // Check if context is available
//     const { offsetX, offsetY } = nativeEvent;
//     canvasContextRef.current.lineTo(offsetX, offsetY);
//     canvasContextRef.current.stroke();
//     nativeEvent.preventDefault();
//   };

//   const stopDrawing = () => {
//     if (canvasContextRef.current) {
//       canvasContextRef.current.closePath();
//     }
//     setIsDrawing(false);
//   };

//   const drawNow = () => {
//     if (!canvasContextRef.current) return; // Check if context is available
//     canvasContextRef.current.globalCompositeOperation = "source-over";
//     canvasContextRef.current.lineWidth = lineWidth;
//   };

//   const eraseNow = () => {
//     if (!canvasContextRef.current) return; // Check if context is available
//     canvasContextRef.current.globalCompositeOperation = "destination-out";
//     canvasContextRef.current.lineWidth = lineWidth;
//   };

//   const eraseAll = () => {
//     if (!canvasContextRef.current) return; // Check if context is available
//     canvasContextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//   };

//   const handleLineWidthChange = (event) => {
//     setLineWidth(parseInt(event.target.value, 10));
//   };

//   useEffect(() => {
//     if (canvasContextRef.current) {
//       canvasContextRef.current.lineWidth = lineWidth; // Update lineWidth directly
//     }
//   }, [lineWidth]);

//   return (
//     <>
//       <canvas
//         className="canvas-container"
//         ref={canvasRef}
//         onMouseDown={startDrawing}
//         onMouseUp={stopDrawing}
//         onMouseMove={draw}
//         onMouseLeave={stopDrawing}
//       >
//         Ink-Spill
//       </canvas>
//       <div>
//         <button onClick={drawNow} className=" bg-white w-20 text-black m-4" >Pencil</button>
//         <button onClick={eraseNow} className=" bg-white w-20 text-black m-4">Eraser</button>
//         <button onClick={eraseAll} className=" bg-white w-20 text-black m-4">Erase All</button>
//         <label className=" bg-white text-black m-4 p-0.5">
//           Stroke Width:
//           <select className=" ml-2" value={lineWidth} onChange={handleLineWidthChange}>
//             <option value={5}>5px</option>
//             <option value={10}>10px</option>
//             <option value={15}>15px</option>
//             <option value={20}>20px</option>
//           </select>
//         </label>
//       </div>
//     </>
//   );
// }







import React, { useEffect, useRef, useState } from "react";
import "./DrawingCanvas.css";
import { useSocket } from "../../contexts/SocketContext";

export default function DrawingCanvas() {
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);

  const {socket, socketId} = useSocket();
  const room='room1'
  // console.log("reached drawing canvas");
  // console.log('socketId',socketId);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return; // Ensure canvas is not null
//     canvas.width = 600;
//     canvas.height = 600;

//     const context = canvas.getContext("2d");
//     if (!context) return; // Ensure context is not null
//     context.lineCap = "round";
//     context.strokeStyle = "black";
//     context.lineWidth = lineWidth; // Set initial lineWidth
//     canvasContextRef.current = context;
// },[]);

useEffect(() => {
  // console.log("reached useEffect");
  const canvas = canvasRef.current;
  if (!canvas) return; // Ensure canvas is not null
  canvas.width = 600;
  canvas.height = 600;

  const context = canvas.getContext("2d");
  if (!context) return; // Ensure context is not null
  context.lineCap = "round";
  context.strokeStyle = "black";
  context.lineWidth = lineWidth; // Set initial lineWidth
  canvasContextRef.current = context;
  // if (!socket) return;
  // console.log("hey there", socketId)
  // const handleDrawing = ({}) => {

  // };
  // const handleStartDraw = () => startDrawing();
  // const handleStopDraw = () => stopDrawing();
  // const handleDrawing = ()=>{
  //   console.log("hello simran");
  // }

  socket.on('drawingClient', ({offsetX, offsetY})=>{
    if (!canvasContextRef.current) return;
    // if (!isDrawing || !canvasContextRef.current) return; // Check if context is available
    canvasContextRef.current.lineTo(offsetX, offsetY);
    canvasContextRef.current.stroke();
  });
  socket.on('startDrawClient', ({offsetX, offsetY})=>{
    // if (!canvasContextRef.current) return; // Check if context is available
    if (!canvasContextRef.current) return;
    canvasContextRef.current.beginPath();
    canvasContextRef.current.moveTo(offsetX, offsetY);
    canvasContextRef.current.lineTo(offsetX, offsetY);
    canvasContextRef.current.stroke();
    // setIsDrawing(true);
  });
  socket.on('stopDrawClient', ()=>{
    if (canvasContextRef.current) {
      canvasContextRef.current.closePath();
    }
    // setIsDrawing(false);
  });

  socket.on('eraseNowClient', ()=>{
    if (!canvasContextRef.current) return;
    canvasContextRef.current.globalCompositeOperation = "destination-out";
    canvasContextRef.current.lineWidth = lineWidth;
  })

  socket.on('eraseAllClient', ()=>{
    if (!canvasContextRef.current || !canvasRef.current) return;
    canvasContextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  })

  socket.on('lineWidthClient', (newLineWidth)=>{
    if (!canvasContextRef.current) return;
    canvasContextRef.current.lineWidth = newLineWidth;
  })

  socket.on('drawNowClient', ()=>{
    if (!canvasContextRef.current) return;
    canvasContextRef.current.globalCompositeOperation = "source-over";
    canvasContextRef.current.lineWidth = lineWidth;
  })

}, [socket]);

  const startDrawing = ({ nativeEvent }) => {
    if (!canvasContextRef.current) return; // Check if context is available
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    nativeEvent.preventDefault();
    socket.emit('startDraw',{offsetX, offsetY, room});
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !canvasContextRef.current) return; // Check if context is available
    const { offsetX, offsetY } = nativeEvent;
    nativeEvent.preventDefault();
    socket.emit('drawing',{offsetX, offsetY, room});
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    socket.emit('stopDraw',{room});
  };

  const drawNow = () => {
    // if (!canvasContextRef.current) return; // Check if context is available
    // canvasContextRef.current.globalCompositeOperation = "source-over";
    // canvasContextRef.current.lineWidth = lineWidth;
    socket.emit('drawNowEvent',{room});
  };

  const eraseNow = () => {
    // if (!canvasContextRef.current) return; // Check if context is available
    // canvasContextRef.current.globalCompositeOperation = "destination-out";
    // canvasContextRef.current.lineWidth = lineWidth;
    socket.emit('eraseNowEvent',{room});
  };

  const eraseAll = () => {
    // if (!canvasContextRef.current) return; // Check if context is available
    socket.emit('eraseAllEvent',{room});
    // canvasContextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleLineWidthChange = (event) => {
    const newLineWidth = parseInt(event.target.value, 10);
    setLineWidth(newLineWidth);
    socket.emit('lineWidthEvent', {newLineWidth,room});
  };

  useEffect(() => {
    if (canvasContextRef.current) {
      canvasContextRef.current.lineWidth = lineWidth; // Update lineWidth directly
    }
    // socket.emit('lineWidthEvent', {lineWidth,room});
  }, [lineWidth]);

  return (
    <>
      <canvas
        className="canvas-container"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
      >
        Ink-Spill
      </canvas>
      <div>
        <button onClick={drawNow} className=" bg-white w-20 text-black m-4" >Pencil</button>
        <button onClick={eraseNow} className=" bg-white w-20 text-black m-4">Eraser</button>
        <button onClick={eraseAll} className=" bg-white w-20 text-black m-4">Erase All</button>
        <label className=" bg-white text-black m-4 p-0.5">
          Stroke Width:
          <select className=" ml-2" value={lineWidth} onChange={handleLineWidthChange}>
            <option value={5}>5px</option>
            <option value={10}>10px</option>
            <option value={15}>15px</option>
            <option value={20}>20px</option>
          </select>
        </label>
      </div>
    </>
  );
}



