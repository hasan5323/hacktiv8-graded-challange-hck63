"use strict";
const Controller = require("./controllers/controller.js");
const [command,...params] = process.argv.slice(2);
// Good luck ...
switch (command) {
  default:
    Controller.help();
    break;
  case "help":
    Controller.help();
    break;
  case "planeList":
    Controller.planeList();
    break;
  case "passengerList":
    Controller.passengerList();
    break;
  case "flightInfo":
    Controller.flightInfo(params);
    break;
  case "buyTicket":
    Controller.buyTicket(params);
    break;
  case "ticketInfo":
    Controller.ticketInfo(params);
    break;
}
