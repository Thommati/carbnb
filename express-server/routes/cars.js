const express = require("express");
const {
  getAllCarsAsync,
  getCarByIdAsync,
  createNewCarAsync,
  deleteCarWithIdAsync,
  updateCarAsync,
} = require("../db/repositories/carsRepo");

const router = express.Router();

// GET /api/cars
// gets all cars in db, or gets all cars for a given province & city
// if either province or city are null then all cars in db will be returned.
router.get("/", async (req, res) => {
  const { city } = req.query;
  try {
    const { rows } = await getAllCarsAsync({ city });
    return res.json(rows);
  } catch (err) {
    console.log("Error retrieving cars from DB:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/cars
// Register / create a new car for a host.  Returns newly created car object.
router.post("/", async (req, res) => {
  try {
    const { rows } = await createNewCarAsync(req.body);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.log("Error saving new car to DB:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await getCarByIdAsync(req.params.id);
    return res.json(rows[0]);
  } catch (err) {
    console.log(`Error retrieving car with id ${req.params.id}`, err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/cars/:id
// Deletes a car with the given id from the database
router.delete("/:id", async (req, res) => {
  try {
    _ = await deleteCarWithIdAsync(req.params.id);
    return res.status(204).json();
  } catch (err) {
    console.log("Error deleting record from DB:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/cars/:id
// Update a car db entry.
router.put("/:id", async (req, res) => {
  try {
    _ = await updateCarAsync(req.params.id, req.body);
    return res.status(204).json();
  } catch (err) {
    console.log(`Error updating car with id ${req.params.id}`, err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
