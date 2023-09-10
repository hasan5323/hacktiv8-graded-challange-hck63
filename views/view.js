"use strict";

const { log } = require("console");

class View {
  static showCommandList() {
    let helpMessage = `
    Command list
    =============
    $ node app.js
    $ node app.js help 
    $ node app.js planeList
    $ node app.js passengerList
    $ node app.js flightInfo <flight_number>
    $ node app.js buyTicket  <flight_number> <passenger_name> <passenger_gender> <seat_number> <ticket_type>
    $ node app.js ticketInfo <passenger_id>
    `;
    console.log(helpMessage);
  }

  // Tambahkan sendiri method yang kamu butuhkan
  static error(err) {
    console.log(err);
  }
  static listPlane(data) {
    console.table(data);
  }
  static listPassenger(data) {
    let editedData = [];
    data.forEach((element) => {
      let airlineName = element.ticket.airlineName;
      delete element.ticket;
      element["airlineName"] = airlineName;
      editedData.push(element);
    });
    console.table(editedData);
  }
  static flightInfo(data) {
    if (data === "no plane") {
      console.log(`plane not found, please check your input`);
    } else {
      console.log(data);
    }
  }
  static buyTicket(data) {
    if (data === "seat taken") {
      console.log(`seat already been booked, please choose another seat`);
    } else {
      console.log(
        `Success buy ticket for seat ${data.ticket.seatNumber} for ${data.ticket.airlineName} destination to ${data.ticket.destination}`
      );
    }
  }
  static ticketInfo(data) {
    if (data === null) {
      console.log(`passenger not found, please check your input`);
    } else {
      console.log(
        `this ${data.ticket.type} area booked for ${data.ticket.airlineName} to ${data.ticket.destination} with seat number ${data.ticket.seatNumber}`
      );
    }
  }
}

module.exports = View;
