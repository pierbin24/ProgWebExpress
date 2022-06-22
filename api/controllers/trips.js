const mongoose = require("mongoose");

const Trip = require("../models/trip");

exports.trips_get_all = (req, res, next) => {
  //find all elements
  Trip.find()
    .select("data mezzo coordinate tappe ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        trips: docs.map((doc) => {
          console.log("From databse", doc);
          return {
            data: doc.data,
            mezzo: doc.mezzo,
            coordinate: doc.coordinate,
            tappe: doc.tappe,
            request: {
              type: "GET",
              url: "http://localhost:3000/trips/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errror: err,
      });
    });
};

exports.trips_create_trip = (req, res, next) => {
  // router.post("/", checkAuth, upload.single("productImage"), (req, res, next) => {
  let request = JSON.stringify(req.body);
  (req) => req.body.json();
  console.log("req " + req);
  console.log("this is the request: " + request);

  const trip = new Trip({
    _id: new mongoose.Types.ObjectId(),
    data: req.body.data,
    mezzo: req.body.mezzo,
    coordinate: req.body.coordinate,
    tappe: req.body.tappe,
  });
  //provided by mongoose
  trip
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created trip successfully",
        createTrip: {
          data: result.data,
          mezzo: result.mezzo,
          coordinate: result.coordinate,
          tappe: result.tappe,
          request: {
            type: "GET",
            url: "http://localhost:3000/trips/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.trips_get_byID = (req, res, next) => {
  const id = req.params.tripId;
  Trip.findById(id)
    .select("data mezzo coordinate tappe ")
    .exec()
    .then((doc) => {
      console.log("From databse", doc);
      if (doc) {
        res.status(200).json({
          trip: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/trips",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "no valid entry found for provided id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.trips_modify_trip = (req, res, next) => {
  const id = req.params.tripId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps.value);
  Trip.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Trip updated successfully",
        request: {
          type: "GET",
          url: "http://localhost:3000/trips/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.trips_delete_trip = (req, res, next) => {
  const id = req.params.tripId;
  Trip.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Trip deleted",
        request: {
          type: "POST",
          url: " http://localhost:3000/trips",
          body: {
            data: "String",
            mezzo: "String",
            coordinate: "String",
            tappe: "String",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
