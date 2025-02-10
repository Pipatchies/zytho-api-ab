import { Router } from 'express';
import { ingredientBeerController } from '../controllers/ingredientBeerController';

export const router = Router();

/**
 * @swagger
 * tags:
 *   name: Ingredients of beer
 *   description: Gestion des ingrédients d'une bière
 */
/**
 * @swagger
 * /ingredients/byBeer/{id}:
 *   get:
 *     summary: Récupérer les ingrédients associées à une bière spécifique par son ID
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de la bière pour laquelle récupérer les ingrédients
 *     responses:
 *       200:
 *         description: Liste des ingrédients et de leur poucentage associés à la bière
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IngredientBeerResponseBody'
 *       404:
 *         description: L'ID de la bière est manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.get("/byBeer/:id", ingredientBeerController.getIngredientsByBeerId);