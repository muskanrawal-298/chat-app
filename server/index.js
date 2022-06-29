 const app = require('express')()
const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});



// io.on('connection', socket =>{
//     console.log('connection made successfully')
//     socket.on('message',payload => {
//         console.log('Message received on server: ', payload)
//         io.emit('message',payload)
//     })
// })

io.on("connection", (socket) => {
	socket.emit("me", socket.id)
  console.log('call connect')
	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
    console.log('call user')
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})
 
	socket.on("answerCall", (data) => {
    console.log('call answer')
		io.to(data.to).emit("callAccepted", data.signal)
	})
})


server.listen(4001,()=>{
    console.log('I am listening at port: 4001)');
})

