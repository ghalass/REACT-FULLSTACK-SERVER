const express = require("express");
const router = express.Router();
const { TypeParcs } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
// const { Op } = require("sequelize");

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const listOfObjects = await TypeParcs.findAll({
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
  const site = req.body;

  try {
    const siteFounded = await TypeParcs.findOne({
      where: {
        [Op.and]: [
          { id: { [Op.ne]: site.id } },
          { title: { [Op.eq]: site.title } },
        ],
      },
    });
    if (siteFounded) {
      res.json({ error: "Site Is already exist" });
    } else {
      const updatedSite = await TypeParcs.update(site, {
        where: { id: site.id },
      });
      res.json(updatedSite);
    }
  } catch (error) {
    res.json({ error: error });
  }
});

// DELETE A POST
router.delete("/:siteId", async (req, res) => {
  try {
    const siteId = req.params.siteId;
    await TypeParcs.destroy({
      where: {
        id: siteId,
      },
    });
    res.json("DELETED SUCCESSFULLY");
  } catch (error) {
    console.log(`${error}`.red);
    res.json({ error: "Site Doesn't Exist" });
  }
});

module.exports = router;
