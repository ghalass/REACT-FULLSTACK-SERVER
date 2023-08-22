const express = require("express");
const router = express.Router();
const { Engins, Parcs, Sites } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const listOfObjects = await Engins.findAll({
      order: [["createdAt", "DESC"]],
      include: [Parcs, Sites],
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
    const object = await Engins.findByPk(id, { include: [Parcs, Sites] });
    if (object) {
      res.json(object);
    } else {
      res.json({ error: "Engin Doesn't Exist" });
    }
  } catch (error) {
    console.log(`${error}`.red);
    res.json({ error: error });
  }
});

// GET BY SITE_ID
router.get("/bySiteId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const object = await Engins.findAll({
      where: { SiteId: id },
    });
    if (object.length !== 0) {
      res.json(object);
    } else {
      res.json({ error: "Non Engin found !" });
    }
  } catch (error) {
    console.log(`${error}`.red);
    res.json({ error: error });
  }
});

// CREATE
router.post("/", async (req, res) => {
  const object = req.body;
  try {
    const objectFounded = await Engins.findOne({
      where: {
        title: object.title,
      },
    });
    if (objectFounded) {
      res.json({ error: "Engin Is already exist" });
    } else {
      const objectCreated = await Engins.create(object);
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
    const objectFounded = await Engins.findOne({
      where: {
        [Op.and]: [
          { id: { [Op.ne]: object.id } },
          { title: { [Op.eq]: object.title } },
        ],
      },
    });
    if (objectFounded) {
      res.json({ error: "Engin Is already exist" });
    } else {
      const updatedEngin = await Engins.update(object, {
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
    const objectFounded = await Engins.findByPk(_id);
    if (objectFounded) {
      await Engins.destroy({
        where: {
          id: _id,
        },
      });
      res.json("DELETED SUCCESSFULLY");
    } else {
      res.json({ error: "Engin Doesn't Exist" });
    }
  } catch (error) {
    res.json({ error: "Engin Doesn't Exist" });
  }
});

module.exports = router;
