import { Router } from "express";
import { location } from "../data/location.js";

const locationRouter = Router();

//GET
locationRouter.get("/", (req, res) => {
  res.send(location);
});

//GET by id
locationRouter.get("/:id", (req, res, next) => {
  const locationById = location.find(
    (locationById) => locationById.id == req.params.id
  );
  if (locationById) {
    res.send(locationById);
  } else {
    next();
  }
});

//POST
locationRouter.post("/", (req, res) => {
  if (
    req.body.productDetails_id &&
    req.body.dress_Id &&
    req.body.store &&
    req.body.zipcode
  ) {
    if (
      location.find((l) => l.productDetails_id == req.body.productDetails_id) &&
      location.find((l) => l.dress_Id == req.body.dress_Id)
    ) {
      res.json({ error: "Already Exist" });
      return;
    }

    const newLocation = {
      id: location[location.length - 1].id + 1,
      productDetails_id: req.body.productDetails_id,
      dress_Id: req.body.dress_Id,
      store: req.body.store,
      zipcode: req.body.zipcode,
    };

    location.push(newLocation);
    res.json(location[location.length - 1]);
    res.redirect("/");
  }
});

//PATCH OR UPDATE by id
locationRouter.patch("/:id", (req, res, next) => {
  const locationUpdate = location.find((l, i) => {
    if (l.id == req.params.id) {
      for (const key in req.body) {
        location[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (locationUpdate) {
    res.json(locationUpdate);
  } else {
    next();
  }
});

//DELETE by id
locationRouter.delete("/:id", (req, res, next) => {
  const deleteLocation = location.find((l, i) => {
    if (l.id == req.params.id) {
      location.splice(i, 1);
      return true;
    }
  });

  if (deleteLocation) {
    res.json(location);
  } else {
    next();
  }
});

export default locationRouter;
