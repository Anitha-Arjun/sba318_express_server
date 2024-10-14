import { Router } from "express";
import { dress } from "../data/dress.js";

const dressRouter = Router();

//GET
dressRouter.get("/", (req, res) => {
  res.send(dress);
});

//GET by id
dressRouter.get("/:id", (req, res, next) => {
  const itemById = dress.find((itemById) => itemById.id == req.params.id);
  if (itemById) {
    res.send(itemById);
  } else {
    next();
  }
});

//POST
dressRouter.post("/", (req, res, next) => {
  if (req.body.product_name && req.body.product_id && req.body.price) {
    if (dress.find((i) => i.product_name == req.body.product_name)) {
      res.json({ error: "Item already Exist" });
      return;
    }

    const newId = dress.length > 0 ? dress[dress.length - 1].id + 1 : 1;

    const newItem = {
      id: newId,
      product_name: req.body.product_name,
      product_id: req.body.product_id,
      price: req.body.price,
    };

    dress.push(newItem);
    res.json(dress[dress.length - 1]);
  } else {
    next();
    //res.status(404).json({ error: "All fields are required" });
  }
});

//PATCH OR UPDATE by id
dressRouter.patch("/:id", (req, res, next) => {
  const itemIndex = dress.findIndex((g) => g.id == req.params.id);

  if (itemIndex !== -1) {
    const updatedItem = { ...dress[itemIndex], ...req.body };
    dress[itemIndex] = updatedItem;
    res.json(updatedItem);
  } else {
    next();
    // res.status(404).json({ error: "Item not found" });
  }
});

//DELETE by id
dressRouter.delete("/:id", (req, res, next) => {
  const deleteByItemId = dress.find((g, i) => {
    if (g.id == req.params.id) {
      dress.splice(i, 1);
      return true;
    }
  });

  if (deleteByItemId) {
    res.json(deleteByItemId);
  } else {
    next();
    // res.status(404).json({ error: "Cannot delete an item" });
  }
});

export default dressRouter;
