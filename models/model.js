"use strict";
const fs = require("fs");
const { Plane, Passenger } = require("./class.js");

// Tambahkan parameter sesuai kebutuhanmu
class Model {
  // PART 1
  static readPlanes(callback) {
    fs.readFile("./data/plane.json", "utf-8", (err, data) => {
      if (err) {
        callback(err);
      } else {
        data = JSON.parse(data);
        let result = [];
        data.forEach((element) => {
          let { flightNumber, airlineName, origin, destination } = element;
          let instance = new Plane(
            flightNumber,
            airlineName,
            origin,
            destination
          );
          result.push(instance);
        });
        callback(null, result);
      }
    });
  }
  static readPassengers(callback) {
    fs.readFile("./data/passenger.json", "utf-8", (err, data) => {
      if (err) {
        callback(err);
      } else {
        data = JSON.parse(data);
        let result = [];
        data.forEach((element) => {
          let { id, name, gender, ticket } = element;
          let instance = new Passenger(id, name, gender, ticket);
          result.push(instance);
        });
        callback(null, result);
      }
    });
  }
  static findFlight(nomor_penerbangan, callback) {
    // flightInfo
    nomor_penerbangan = Number(nomor_penerbangan);
    Model.readPlanes((err, data) => {
      if (err) {
        callback(err);
      } else {
        let desired = data.filter((a) => a.flightNumber === nomor_penerbangan);
        if (desired.length === 0) {
          callback(null, "no plane");
        } else {
          desired = desired[0];
          desired.passenger = [];
          Model.readPassengers((err, data) => {
            if (err) {
              callback(err);
            } else {
              data.forEach((element) => {
                if (element.ticket.airlineName === desired.airlineName) {
                  desired.passenger.push(element);
                }
              });
              callback(null, desired);
            }
          });
        }
      }
    });
  }

  // PART 2
  static save(data, pathFile, cb) {
    // note jika ingin diganti atau mau menambahkan method boleh untuk method save ini
    // yang digunakan untuk writeFile
    fs.writeFile(pathFile, JSON.stringify(data, null, 4), "utf-8", (err) => {
      cb(err);
    });
  }
  static addPassenger(params, callback) {
    // buyTicket
    //destruc params
    let [flightNumber, name, gender, seatNumber, type] = params;
    //load planes to choose witch match the flight number desired
    Model.findFlight(flightNumber, (err, dataFlight) => {
      if (err) {
        callback(err);
      } else {
        let boardedPassenger = dataFlight.passenger;
        let seatStatus = false
        let planeSeats = ["A-1","A-2","A-3","A-4","A-5","A-6","A-7","A-8","B-1","B-2","B-3","B-4","B-5","B-6","B-7","B-8","C-1","C-2","C-3","C-4","C-5","C-6","C-7","C-8","D-1","D-2","D-3","D-4","D-5","D-6","D-7","D-8",]
        for (const seat of planeSeats) {
          if (seatNumber === seat) {
            seatStatus = true;
            break
          }
        }        if (boardedPassenger.length !== 0) {
          for (const passenger of boardedPassenger) {
            console.log(passenger.name, ">>>", passenger.ticket.seatNumber);
            if (passenger.ticket.seatNumber === seatNumber) {
              seatStatus = false;
              break
            }
          }
        }
        if (seatStatus === false) {
          callback(null, "seat taken");
        } else {
          let id = 1;
          Model.readPassengers((err, data) => {
            if (err) {
              callback(err);
            } else {
              id = data[data.length - 1].id + 1;
              let ticket = {
                airlineName: dataFlight.airlineName,
                type: type,
                origin: dataFlight.origin,
                destination: dataFlight.destination,
                seatNumber: seatNumber,
              };
              let newPassenger = {
                id,
                name,
                gender,
                ticket,
              };
              data.push(newPassenger);
              Model.save(data, "./data/passenger.json", (err) => {
                if (err) {
                  callback(err);
                } else {
                  callback(null, newPassenger);
                }
              });
            }
          });
        }
      }
    });
  }
  static findPassenger(param, callback) {
    // ticketInfo
    param = Number(param);
    Model.readPassengers((err, data) => {
      if (err) {
        callback(err);
      } else {
        let desired = null;
        for (const element of data) {
          if (element.id === param) {
            desired = element;
          }
        }
        callback(null, desired);
      }
    });
  }
}

module.exports = Model;
