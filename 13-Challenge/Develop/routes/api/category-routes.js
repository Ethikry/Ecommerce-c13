const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  }).then(function (data) {
    (err, res) => {
      if (err) throw err;
      res.JSON(data);
    };
  });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  }).then(function (data) {
    (err, res) => {
      if (err) throw err;
      res.JSON(data);
    };
  });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body).then(function (data) {
    (err, res) => {
      if (err) throw err;
      res.status(200).JSON(data);
    };
  });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(Category.findByPk(req.params.id))
    .then(function (data) {
      (err, res) => {
        if (err) throw err;
        res.status(200).JSON(data);
      };
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function (data) {
    (err, res) => {
      if (err) throw err;
      res.JSON(`${data} was destroyed.`);
    };
  });
});

module.exports = router;
