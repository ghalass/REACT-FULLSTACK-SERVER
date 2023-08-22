const express = require("express");
const router = express.Router();
const { TypeParcs, Parcs } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const listOfObjects = await TypeParcs.findAll({
      order: [["createdAt", "DESC"]],
      include: [Parcs],
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
    const post = await TypeParcs.findByPk(id);
    res.json(post);
  } catch (error) {
    console.log(`${error}`.red);
    res.json({ error: "Site Doesn't Exist" });
  }
});

// CREATE POST
router.post("/", async (req, res) => {
  const site = req.body;
  const siteFounded = await TypeParcs.findOne({
    where: {
      title: site.title,
    },
  });
  if (siteFounded) {
    res.json({ error: "TypeParc Is already exist" });
  } else {
    await TypeParcs.create(site);
    res.json(site);
  }
});

// UPDATE POST
router.put("/", async (req, res) => {
  const typeparc = req.body;

  try {
    const siteFounded = await TypeParcs.findOne({
      where: {
        [Op.and]: [
          { id: { [Op.ne]: typeparc.id } },
          { title: { [Op.eq]: typeparc.title } },
        ],
      },
    });
    if (siteFounded) {
      res.json({ error: "typeparc Is already exist" });
    } else {
      const updatedTypeParc = await TypeParcs.update(typeparc, {
        where: { id: typeparc.id },
      });
      res.json(updatedTypeParc);
    }
  } catch (error) {
    res.json({ error: error });
  }
});

// DELETE A POST
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await TypeParcs.destroy({
      where: {
        id: id,
      },
    });
    res.json("DELETED SUCCESSFULLY");
  } catch (error) {
    res.json({ error: "TypeParc Doesn't Exist" });
  }
});

module.exports = router;
