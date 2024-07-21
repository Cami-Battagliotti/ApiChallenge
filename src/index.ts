import net from "net";
import { PORT } from "./constants";
import { main } from "./app";

const server = net.createServer();

server.on("connection", (socket) => {
  socket.on("data", async (clientRequest) => {
    // Obtiene y devuelve la informacion solicitada al cliente al conectarse con los endpoints contenidos en la funcion main() del archivo app.ts
    const clientFeedback = await main(clientRequest);
    //console.log(clientFeedback);

    socket.write(clientFeedback);
  });
});

server.listen(PORT, () => console.log("Server listening on port: " + PORT));
