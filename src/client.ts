import net from "net";
import pc from "picocolors";
import { ResponseStatus } from "./utils/responseMsg";

const client = net.createConnection({ port: 3000 });

client.on("connect", () => {
  //const requestedData = { requestedAction: "all" };
  const requestedData = { requestedAction: "name", parameterName: "italy" };
  //const requestedData = {requestedAction: "language",parameterName: "italian"};
  //const requestedData = { requestedAction: "currency", parameterName: "pound" };
  //const requestedData = { requestedAction: "capital", parameterName: "london" };
  //const requestedData = {requestedAction: "capitalAndForecast",parameterName: "london",days: 3};
  //const requestedData = {requestedAction: "capitalAndSports",parameterName: "bern"};

  const requestMessage = JSON.stringify(requestedData);
  client.write(requestMessage);
});

client.on("data", (serverMessage) => {
  const message = serverMessage.toString();
  try {
    const serverData = JSON.parse(message);
    if (typeof serverData == "string") {
      console.log("\n", pc.red(pc.bold(serverData)), "\n");
    } else {
      console.log(pc.yellow(pc.italic(ResponseStatus.OK)), "\n", serverData);
    }
  } catch (error) {
    //Imprimo el error y la descripcion del mismo para ver donde y por que se da.
    console.error("Error:", error.message);
  }
  // const serverData = JSON.parse(message);
  // if (typeof serverData == "string") {
  //   console.log(pc.red(pc.bold(serverData)), "\n");
  // } else {
  //   console.log(pc.green(pc.italic(ResponseStatus.OK)), "\n", serverData);
  // }
});
