## for client
npm install socket.io-client

## for server
npm install socket.io
Also in package.json write: "type":"module" now you will need to use import 'oof' from 'oofpkg' instead of require

npm install cors

socket.on("connect"): This event is fired on the client side when the client successfully connects to the Socket.IO server. It’s a client-side event that doesn’t need to be explicitly emitted by the server. Instead, it’s a built-in event that Socket.IO provides to signal that the connection has been established.

io.on("connection"): This event is fired on the server side when a new client connects to the Socket.IO server. Inside this event handler, you can set up various socket event listeners for that particular connection. 