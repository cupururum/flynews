const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/gettrends",
  {
    useMongoClient: true
  }
);

const citiesSeed = [
  { name: 'San Francisco', woeid: 2487956, coordinates: { lat: 37.7749, long: -122.4194 }, magnitude: 0},
  { name: 'Boston', woeid: 2367105, coordinates: { lat: 42.3601, long: -71.0589 }, magnitude: 0 },
  { name: 'Chicago', woeid: 2379574, coordinates: { lat: 41.8781, long: -87.6298 }, magnitude: 0 },
  { name: 'Houston', woeid: 2424766, coordinates: { lat: 29.7604, long: -95.3698 }, magnitude: 0 },
  { name: 'Las Vegas', woeid: 2436704, coordinates: { lat: 36.1699, long: -115.1398 }, magnitude: 0 },
  { name: 'Minneapolis', woeid: 2452078, coordinates: { lat: 44.9778, long: -93.2650 }, magnitude: 0 },
  { name: 'New York', woeid: 2459115, coordinates: { lat: 40.7128, long: -74.0060 }, magnitude: 0 },
  { name: 'Portland', woeid: 2475687, coordinates: { lat: 45.5231, long: -122.6765 }, magnitude: 0 },
  { name: 'Washington', woeid: 2514815, coordinates: { lat: 47.7511, long: -120.7401 }, magnitude: 0 },
  { name: 'Tampa', woeid: 2503863, coordinates: { lat: 27.9506, long: -82.4572 }, magnitude: 0 }
];
db.City.remove({})
  .then(() => db.City.insertMany(citiesSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
