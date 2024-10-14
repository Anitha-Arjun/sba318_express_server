import { Router } from "express";
import { productDetails } from "../data/productDetails.js";

const productRouter = Router();

//GET
productRouter.get("/", (req, res) => {
  res.send(productDetails);
});

//GET by id
productRouter.get("/:id", (req, res, next) => {
  const itemById = productDetails.find(
    (itemById) => itemById.id == req.params.id
  );
  if (itemById) {
    res.send(itemById);
  } else {
    next();
  }
});

//POST
productRouter.post("/", (req, res, next) => {
  if (req.body.girlsId && req.body.size && req.body.product_description) {
    if (productDetails.find((i) => i.girlsId == req.body.girlsId)) {
      res.json({ error: "Item already Exist" });
      return;
    }

    const newId =
      productDetails.length > 0
        ? productDetails[productDetails.length - 1].id + 1
        : 1;

    const newItem = {
      id: newId,
      girlsId: req.body.girlsId,
      size: req.body.size,
      product_description: req.body.product_description,
    };

    productDetails.push(newItem);
    res.json(productDetails[productDetails.length - 1]);
  } else {
    next();
    //res.status(404).json({ error: "All fields are required" });
  }
});

//PATCH OR UPDATE by id
productRouter.patch("/:id", (req, res, next) => {
  const itemIndex = productDetails.findIndex((p) => p.id == req.params.id);

  if (itemIndex !== -1) {
    const updatedItem = { ...productDetails[itemIndex], ...req.body };
    productDetails[itemIndex] = updatedItem;
    res.json(updatedItem);
  } else {
    next();
    // res.status(404).json({ error: "Item not found" });
  }
});

//DELETE by id
productRouter.delete("/:id", (req, res, next) => {
  const deleteByItemId = productDetails.find((p, i) => {
    if (p.id == req.params.id) {
      productDetails.splice(i, 1);
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

export default productRouter;
