import net from "net";

const client = net.createConnection({ port: 3000 });

client.on("connect", () => {
  const requestedData = {
    requestedAction: "language",
    parameterName: "italian",
  };
  // const requestedData = { requestedAction: "name", parameterName: "spanish" };
  // const requestedData = { requestedAction: "currency", parameterName: "spanish" };
  // const requestedData = { requestedAction: "capital", parameterName: "spanish" };
  // const requestedData = { requestedAction: "all"};

  const requestMessage = JSON.stringify(requestedData);
  client.write(requestMessage);
});

client.on("data", (serverMessage) => {
  const message = serverMessage.toString();
  const serverData = JSON.parse(message);
  console.log(serverData);
});
