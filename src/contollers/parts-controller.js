const CartPart = require("../../models/CartPart");
const { v4: uuidv4 } = require("uuid");

module.exports.getAllParts = async (req, res) => {
  const parts = await CartPart.findAll();
  console.log(parts.every((part) => part instanceof CartPart)); // true
  console.log("All parts:", JSON.stringify(parts, null, 2));
  res.send(parts);
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
    res.redirect("/api/homepage");
  });
  res.send(part);
  //res.redirect("/api/homepage");
};

module.exports.findPart = async (req, res) => {
  const { id } = req.params;
  const part = await CartPart.findAll({
    where: {
      uuid: id,
    },
  }).catch((err) => {
    console.log(err);
    res.redirect("/api/parts");
  });
  res.send(part);
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
    res.redirect("/api/parts");
  });
  //console.log(updatedPart); - RETURNS ONLY UPDATED PARAMS, NOT OBJECT
  res.redirect("/api/parts");
};

module.exports.deletePart = async (req, res) => {
  // const { id } = req.params;
  // const deletedPart = await CartPart.destroy({
  //   where: {
  //     uuid: id,
  //   },
  // }).catch((err) => {
  //   console.log(err);
  //   res.redirect("/api/parts");
  // });
  //console.log(deletedPart);
  res.redirect("/api/parts");
};
