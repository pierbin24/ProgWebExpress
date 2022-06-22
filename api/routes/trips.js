const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const cors = require("cors");

const TripsController = require("../controllers/trips");

//chekAuth devo aggiungerlo qui no sui controllers
router.get("/", TripsController.trips_get_all);

router.post("/", TripsController.trips_create_trip);

router.get("/:tripId", TripsController.trips_get_byID);

router.patch("/:tripId", TripsController.trips_modify_trip);

router.delete("/:tripId", TripsController.trips_delete_trip);

module.exports = router;
