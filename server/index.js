const express = require("express");
const PORT = 4400;

const { createServer } = require("node:http");
const cors = require("cors");

const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());

app.get("/io", (req, res) => {
	res.send("Hello from the server!");
});

io.on("connection", (socket) => {
	console.log("A user connected!");

	socket.on("message", (msg) => {
		console.log("message: ", msg);
		io.emit("chat message", msg);
	});

	socket.on("disconnect", () => {
		console.log("A user disconnected!");
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}...`);
});
