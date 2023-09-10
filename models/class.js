"use strict";


class Plane {
  constructor(flightNumber, airlineName, origin, destination) {
    this.flightNumber = flightNumber;
    this.airlineName = airlineName;
    this.origin = origin;
    this.destination = destination;
  }
}
// composition in model
class Passenger {
  constructor(id, name, gender, ticket) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.ticket = TicketFactory.createInstance(ticket)
    ;
  }
}

class Ticket {
  #seatNumber
  constructor(airlineName, type, origin, destination, seatNumber) {
    this.airlineName = airlineName;
    this.type = type;
    this.origin = origin;
    this.destination = destination;
    this.#seatNumber = seatNumber;
  }
  get seatNumber(){
    return this.#seatNumber
  }
  set seatNumber(value){
    this.#seatNumber=value
  }
  toJSON(){
    return {
      airlineName: this.airlineName,
      type: this.type,
      origin: this.origin,
      destination: this.destination,
      seatNumber: this.#seatNumber,
    };
  }
}

class VIP extends Ticket {
  constructor(airlineName, origin, destination, seatNumber) {
    super(airlineName, "VIP", origin, destination, seatNumber);
  }
}
class Business extends Ticket {
  constructor(airlineName, origin, destination, seatNumber) {
    super(airlineName, "Business", origin, destination, seatNumber);
  }
}
class Economy extends Ticket {
  constructor(airlineName, origin, destination, seatNumber) {
    super(airlineName, "Economy", origin, destination, seatNumber);
  }
}

class TicketFactory {
    static createInstance(ticket) {
      let { airlineName, type, origin, destination, seatNumber } = ticket;
      if (type === "VIP") {
        return new VIP(airlineName, origin, destination, seatNumber);
      } else if (type === "Business") {
        return new Business(airlineName, origin, destination, seatNumber);
      } else if (type === "Economy") {
        return new Economy(airlineName, origin, destination, seatNumber);
      } else {
        return new Ticket(airlineName, type, origin, destination, seatNumber);
      }
    }
  }

module.exports = { Plane, Passenger };
