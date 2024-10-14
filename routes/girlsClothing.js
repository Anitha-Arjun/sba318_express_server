import { Router } from "express";
import { girlsClothing } from "../data/girlsClothing.js";

const girlsRouter = Router();

//GET
girlsRouter.get("/", (req, res) => {
  res.send(girlsClothing);
});

//GET by id
girlsRouter.get("/:id", (req, res, next) => {
  const itemById = girlsClothing.find(
    (itemById) => itemById.id == req.params.id
  );
  if (itemById) {
    res.send(itemById);
  } else {
    next();
  }
});

//POST
girlsRouter.post("/", (req, res, next) => {
  if (req.body.product_name && req.body.product_id && req.body.price) {
    if (girlsClothing.find((i) => i.product_name == req.body.product_name)) {
      res.json({ error: "Item already Exist" });
      return;
    }

    const newId =
      girlsClothing.length > 0
        ? girlsClothing[girlsClothing.length - 1].id + 1
        : 1;

    const newItem = {
      id: newId,
      product_name: req.body.product_name,
      product_id: req.body.product_id,
      price: req.body.price,
    };

    girlsClothing.push(newItem);
    res.json(girlsClothing[girlsClothing.length - 1]);
  } else {
    next();
    //res.status(404).json({ error: "All fields are required" });
  }
});

//PATCH OR UPDATE by id
girlsRouter.patch("/:id", (req, res, next) => {
  const itemIndex = girlsClothing.findIndex((g) => g.id == req.params.id);

  if (itemIndex !== -1) {
    const updatedItem = { ...girlsClothing[itemIndex], ...req.body };
    girlsClothing[itemIndex] = updatedItem;
    res.json(updatedItem);
  } else {
    next();
    // res.status(404).json({ error: "Item not found" });
  }
});

//DELETE by id
girlsRouter.delete("/:id", (req, res, next) => {
  const deleteByItemId = girlsClothing.find((g, i) => {
    if (g.id == req.params.id) {
      girlsClothing.splice(i, 1);
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

export default girlsRouter;
