const express = require("express");
const router = express.Router();
const { Parcs } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const listOfObjects = await Parcs.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(listOfObjects);
  } catch (error) {
    res.json({ error: error });
  }
});

// GET BY ID
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const object = await Parcs.findByPk(id);
    res.json(object);
  } catch (error) {
    console.log(`${error}`.red);
    res.json({ error: "Parc Doesn't Exist" });
  }
});

// CREATE
router.post("/", async (req, res) => {
  const object = req.body;
  try {
    const objectFounded = await Parcs.findOne({
      where: {
        title: object.title,
      },
    });
    if (objectFounded) {
      res.json({ error: "Parc Is already exist" });
    } else {
      const objectCreated = await Parcs.create(object);
      res.json(objectCreated);
    }
  } catch (error) {
    res.json({ error: error });
  }
});

// UPDATE
router.put("/", async (req, res) => {
  try {
    const object = req.body;
    const objectFounded = await Parcs.findOne({
      where: {
        [Op.and]: [
          { id: { [Op.ne]: object.id } },
          { title: { [Op.eq]: object.title } },
        ],
      },
    });
    if (objectFounded) {
      res.json({ error: "Parc Is already exist" });
    } else {
      const updatedParc = await Parcs.update(object, {
        where: { id: object.id },
      });
      res.json(updatedParc);
    }
  } catch (error) {
    res.json({ error: error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Parcs.destroy({
      where: {
        id: id,
      },
    });
    res.json("DELETED SUCCESSFULLY");
  } catch (error) {
    console.log(`${error}`.red);
    res.json({ error: "Parc Doesn't Exist" });
  }
});

module.exports = router;
