const express = require("express");
const router = express.Router();
const { SaisieEngins } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const listOfObjects = await SaisieEngins.findAll({
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
    // const object = await SaisieEngins.findByPk(id, { include: [Parcs, Sites] });
    const object = await SaisieEngins.findByPk(id);
    if (object) {
      res.json(object);
    } else {
      res.json({ error: "SaisieEngins Doesn't Exist" });
    }
  } catch (error) {
    res.json({ error: "SaisieEngins Doesn't Exist" });
  }
});

// CREATE
router.post("/", async (req, res) => {
  const object = req.body;
  try {
    const objectFounded = await SaisieEngins.findOne({
      where: {
        dateSaisie: object.dateSaisie,
        enginId: object.enginId,
      },
    });
    if (objectFounded) {
      res.json({ error: "SaisieEngins Is already exist" });
    } else {
      const objectCreated = await SaisieEngins.create(object);
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
    const objectFounded = await SaisieEngins.findOne({
      where: {
        [Op.and]: [
          { id: { [Op.ne]: object.id } },
          { dateSaisie: { [Op.eq]: object.dateSaisie } },
          { enginId: { [Op.eq]: object.enginId } },
        ],
      },
    });
    if (objectFounded) {
      res.json({ error: "SaisieEngins Is already exist" });
    } else {
      const updatedEngin = await SaisieEngins.update(object, {
        where: { id: object.id },
      });
      res.json(updatedEngin);
    }
  } catch (error) {
    res.json({ error: error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const objectFounded = await SaisieEngins.findByPk(_id);
    if (objectFounded) {
      await SaisieEngins.destroy({
        where: {
          id: _id,
        },
      });
      res.json("DELETED SUCCESSFULLY");
    } else {
      res.json({ error: "SaisieEngins Doesn't Exist" });
    }
  } catch (error) {
    res.json({ error: "SaisieEngins Doesn't Exist" });
  }
});

module.exports = router;
