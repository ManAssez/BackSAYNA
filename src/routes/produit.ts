import express from "express";
const router = express.Router();

import { produitController } from "../controllers/produit.controller";

router.get("/", produitController.getAll);
router.post("/save", produitController.save);
router.delete("/delete/:num_produit", produitController.delete);
router.post("/update/:num_produit", produitController.update);

export const ProduitRoute = router;
