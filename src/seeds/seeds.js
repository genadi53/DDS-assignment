const CartPart = require("../../models/CartPart");
const { v4: uuidv4 } = require("uuid");

const BRANDS = [
  "AUDI",
  "BMW",
  " MERCEDES",
  "FORD",
  "FIAT",
  "HONDA",
  "OPEL",
  "PEUGEOT",
  "RENAULT",
  "SITROEN",
  "TOYOTA",
  "SKODA",
  "KIA",
  "VW",
];

const CATEGORIES = [
  "Battery",
  "Axlle",
  "Filers",
  "Water & Oil Pump",
  "Pistons",
  "Brakes",
  "Radiator",
  "AC Compressor",
  "Muffler",
  "Transmission",
  "Shock Absorbers",
];

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randNum = (num) => Math.round(Math.random() * num);

const seedTheDB = async () => {
  await CartPart.destroy({
    truncate: true,
  });

  for (let i = 0; i < 10; i++) {
    let uuid = uuidv4();
    let part = await CartPart.create({
      uuid,
      name: `part ${i}`,
      brand: `${rand(BRANDS)}`,
      model: `model ${rand(alphabet)}${randNum(i)}${rand(alphabet)}${rand(
        alphabet
      )}`,
      category: `${rand(CATEGORIES)}`,
      quantity: randNum(i + 3),
      price: randNum(i + 2),
    }).catch((err) => {
      console.log("ERROR with the parts");
      console.log(err);
    });
    //console.log(part);
  }
};

module.exports = seedTheDB;
