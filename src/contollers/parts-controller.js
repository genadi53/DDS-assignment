const CartPart = require("../../models/CartPart");
const { v4: uuidv4 } = require("uuid");

module.exports.getAllParts = async (req, res) => {
  const parts = await CartPart.findAll().catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  //console.log(parts.every((part) => part instanceof CartPart)); // true
  //console.log("All parts:", JSON.stringify(parts, null, 2));
  //console.log(parts);
  res.json(parts);
};

module.exports.createNewPart = async (req, res) => {
  const { name, brand, model, category, quantity, price } = req.body;
  //console.log(name, brand, model, category, quantity, price);
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
  //console.log(part);
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
  //console.log(name, brand, model, category, quantity, price);

  const { id } = req.params;
  //console.log(id);
  const updatedPart = await CartPart.update(
    { name, brand, model, category, quantity, price },
    { where: { uuid: id } }
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  //console.log(updatedPart);
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
  //console.log(deletedPart);
  res.status(200).send("Part deleted successfylly!");
};
