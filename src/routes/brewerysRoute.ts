import { Router } from 'express';
import { brewerysController } from '../controllers/brewerysController';

export const router = Router();

router.get("/", brewerysController.get);
router.get("/:id", brewerysController.getByID);
router.post("/", brewerysController.post);
router.put("/:id", brewerysController.put);
router.delete("/:id", brewerysController.delete);