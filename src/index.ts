import net from "net";
import { PORT } from "./constants";
import { main } from "./app";

const server = net.createServer();

server.on("connection", (socket) => {
  socket.on("data", async (clientRequest) => {
    const clientFeedback = await main(clientRequest);
    socket.write(clientFeedback);
  });
});

server.listen(PORT, () => console.log("Server listening on port: " + PORT));
