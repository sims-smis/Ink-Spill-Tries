import React from "react";
import DrawingCanvas from "../components/DrawingCanvas/DrawingCanvas.js";
import Navbar from "./Navbar.js";

export default function Room() {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      {/* {console.log('I have reached room')} */}
      <div className=" flex w-full " >
        <div className=" flex-[55] bg-red-500 mt-16 ml-5 mr-5 h-[600px] flex justify-center " >
            <h1 className=" font-serif text-2xl" >Let's Talk</h1>
          </div>
        <div className=" flex-[45] flex items-center justify-center flex-col">
          <div className=" font-serif text-4xl mb-3 mt-3 bg-pink-300">
            Hello welcome to the room
          </div>
          <div className=" bg-yellow-300">
            <DrawingCanvas />
          </div>
        </div>
          <div className=" flex-[45] bg-purple-400 mt-16 ml-5 mr-5 h-[600px] flex justify-center" >
            <h1 className=" font-serif text-2xl" >Players</h1>
          </div>
      </div>
    </>
  );
}
