const CartPart = require("../../models/CartPart");
const { v4: uuidv4 } = require("uuid");

module.exports.getAllParts = async (req, res) => {
  const parts = await CartPart.findAll().catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  res.json(parts);
};

module.exports.createNewPart = async (req, res) => {
  const { name, brand, model, category, quantity, price } = req.body;
  if (quantity < 0)
    res.status(400).json({ error: "Part quantity must be greater than 0!" });
  if (price < 0)
    res.status(400).json({ error: "Part price must be greater than 0!" });
  let uuid = uuidv4();
  const part = await CartPart.create({
    uuid,
    name,
    brand,
    model,
    category,
    quantity,
    price,
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  res.status(200).send("Successfully created new part!");
};

module.exports.findPart = async (req, res) => {
  const { id } = req.params;
  const part = await CartPart.findAll({
    where: {
      uuid: id,
    },
  }).catch((err) => {
    res.status(500).json({ error: err });
    console.log(err);
  });
  if (!part) {
    res.status(404).json({ error: "Part not found!" });
  }
  res.json(part);
};

module.exports.updatePart = async (req, res) => {
  const { name, brand, model, category, quantity, price } = req.body;
  const { id } = req.params;

  if (quantity < 0)
    res.status(400).json({ error: "Part quantity must be greater than 0!" });
  if (price < 0)
    res.status(400).json({ error: "Part price must be greater than 0!" });
  const updatedPart = await CartPart.update(
    { name, brand, model, category, quantity, price },
    { where: { uuid: id } }
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  res.status(200).send("Part updated successfylly!");
};

module.exports.deletePart = async (req, res) => {
  const { id } = req.params;
  const deletedPart = await CartPart.destroy({
    where: {
      uuid: id,
    },
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  res.status(200).send("Part deleted successfylly!");
};
