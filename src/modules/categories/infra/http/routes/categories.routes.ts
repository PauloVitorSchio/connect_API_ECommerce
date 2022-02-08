import CategoriesController from "../controllers/CategoriesController";

import { Router } from "express";

const routes = Router();

routes.post("/", CategoriesController.create);

routes.get("/", CategoriesController.listAll);

routes.get("/:id", CategoriesController.find);

routes.put("/:id", CategoriesController.update);

routes.delete("/:id", CategoriesController.delete);

export default routes;
