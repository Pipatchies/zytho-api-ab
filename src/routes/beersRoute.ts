import { Router } from 'express';
import { beersController } from '../controllers/beersController';

export const router = Router();

/**
 * @swagger
 * tags:
 *   name: Beers
 *   description: Gestion des bières
 */
/**
 * @swagger
 * /beers:
 *   post:
 *     summary: Créer une nouvelle bière
 *     tags: [Beers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BeerRequestBody'
 *     responses:
 *       201:
 *         description: La bière a été créée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BeerResponseBody'
 *       500:
 *         description: Erreur serveur
 */
router.post("/", beersController.post);

/**
 * @swagger
 * /beers:
 *   get:
 *     summary: Récupérer toutes les bières
 *     tags: [Beers]
 *     responses:
 *       200:
 *         description: Liste de toutes les bières
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BeerResponseBody'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", beersController.get);

/**
 * @swagger
 * /beers/{id}:
 *   get:
 *     summary: Récupérer une bière par ID
 *     tags: [Beers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de la bière
 *     responses:
 *       200:
 *         description: Les détails de la bière correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BeerResponseBody'
 *       404:
 *         description: Bière introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", beersController.getByID);

/**
 * @swagger
 * /beers/{id}:
 *   put:
 *     summary: Mettre à jour une bière par ID
 *     tags: [Beers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de la bière
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BeerRequestBody'
 *     responses:
 *       200:
 *         description: La bière a été mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BeerResponseBody'
 *       404:
 *         description: Bière introuvable
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", beersController.put);

/**
 * @swagger
 * /beers/{id}:
 *   delete:
 *     summary: Supprimer une bière par ID
 *     tags: [Beers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de la bière
 *     responses:
 *       204:
 *         description: La bière a été supprimée avec succès.
 *       404:
 *         description: Bière introuvable
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", beersController.delete);
