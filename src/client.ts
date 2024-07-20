import net from "net";
import picocolors from "picocolors";

const client = net.createConnection({ port: 3000 });

client.on("connect", () => {
  // const requestedData = { requestedAction: "all"};
  //const requestedData = { requestedAction: "name", parameterName: "italy" };
  //const requestedData = {requestedAction: "language",parameterName: "italian"};
  //const requestedData = { requestedAction: "currency", parameterName: "pound" };
  //const requestedData = { requestedAction: "capital", parameterName: "london" };
  const requestedData = {
    requestedAction: "capitalAndForecast",
    parameterName: "london",
    days: 3,
  };
  //const requestedData = {requestedAction: "capitalAndSports",parameterName: "bern"};

  const requestMessage = JSON.stringify(requestedData);
  client.write(requestMessage);
});

client.on("data", (serverMessage) => {
  const message = serverMessage.toString();
  const serverData = JSON.parse(message);
  if (typeof serverData == "string") {
    console.log(picocolors.red(serverData));
  } else {
    console.log(serverData);
  }
});
