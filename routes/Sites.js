const express = require("express");
const router = express.Router();
const { Sites } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const listOfSites = await Sites.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(listOfSites);
  } catch (error) {
    res.json({ error: error });
  }
});

// GET BY ID
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Sites.findByPk(id);
    res.json(post);
  } catch (error) {
    console.log(`${error}`.red);
    res.json({ error: "Site Doesn't Exist" });
  }
});

// CREATE POST
router.post("/", async (req, res) => {
  const site = req.body;
  const siteFounded = await Sites.findOne({
    where: {
      title: site.title,
    },
  });
  if (siteFounded) {
    res.json({ error: "Site Is already exist" });
  } else {
    await Sites.create(site);
    res.json(site);
  }
});

// UPDATE POST
router.put("/", async (req, res) => {
  const site = req.body;

  try {
    const siteFounded = await Sites.findOne({
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
      const updatedSite = await Sites.update(site, { where: { id: site.id } });
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
    await Sites.destroy({
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
