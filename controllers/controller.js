"use strict";
const Model = require("../models/model");
const View = require("../views/view");

// Tambahkan parameter sesuai kebutuhanmu

class Controller {
  // PART 1
  static help() {
    View.showCommandList();
  }
  static planeList() {
    Model.readPlanes((err,data) => {
      if(err){
        View.error(err)
      } else {
        View.listPlane(data)
      }
    });
  }
  static passengerList() {
    Model.readPassengers((err,data) => {
      if(err){
        View.error(err)
      } else {
        View.listPassenger(data)
      }
    });
  }
  static flightInfo(param) {
    Model.findFlight(param, (err,data) => {
      if(err){
        View.error(err)
      } else {
        View.flightInfo(data)
      }
    })
  }

  // PART 2
  static buyTicket(params) {
    Model.addPassenger(params, (err,data) => {
      if(err){
        View.error(err)
      } else {
        View.buyTicket(data)
      }
    })
  }
  static ticketInfo(param) {
    Model.findPassenger(param, (err,data) => {
      if(err){
        View.error(err)
      } else {
        View.ticketInfo(data)
      }
    })
  }
}

module.exports = Controller;
