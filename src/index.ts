import net from "net";
import { PORT } from "./constants";
import { endpointsOptions } from "./app";

const server = net.createServer();

server.on("connection", (socket) => {
  socket.on("data", async (clientRequest) => {
    const clientFeedback = await endpointsOptions(clientRequest);

    socket.write(clientFeedback);
  });
});

server.listen(PORT, () => console.log("Server listening on port: " + PORT));
