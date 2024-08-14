import { useContext, createContext, useMemo, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [socketId, setSocketId] = useState(null);
    useEffect(()=>{
        const newSocket = io("http://localhost:5001", { withCredentials: true });
        newSocket.on("connect", () => {
            console.log("Connected to server");
            setSocketId(newSocket.id);
        });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    },[])

    const value = useMemo(() => ({ socket, socketId }), [socket, socketId]);
    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
    return useContext(SocketContext);
}