import { Router } from "express";
import { brewerysController } from '../controllers/brewerysController';

export const router = Router();

/**
 * @swagger
 * tags:
 *   name: Breweries
 *   description: Gestion des brasseries
 */

/**
 * @swagger
 * /brewerys:
 *   get:
 *     summary: Récupérer toutes les brasseries
 *     tags: [Breweries]
 *     description: Obtenir une liste de toutes les brasseries enregistrées
 *     responses:
 *       200:
 *         description: Liste des brasseries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BreweryResponseBody'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", brewerysController.get);

/**
 * @swagger
 * /brewerys/{id}:
 *   get:
 *     summary: Récupérer une brasserie par son ID
 *     tags: [Breweries]
 *     description: Obtenir les détails d'une brasserie spécifique par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la brasserie
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la brasserie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BreweryResponseBody'
 *       404:
 *         description: Brasserie non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", brewerysController.getByID);

/**
 * @swagger
 * /brewerys:
 *   post:
 *     summary: Ajouter une nouvelle brasserie
 *     tags: [Breweries]
 *     description: Ajouter une brasserie à la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BreweryRequestBody'
 *     responses:
 *       201:
 *         description: Brasserie créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BreweryResponseBody'
 *       400:
 *         description: Champs requis manquants
 *       500:
 *         description: Erreur serveur
 */
router.post("/", brewerysController.post);

/**
 * @swagger
 * /brewerys/{id}:
 *   put:
 *     summary: Mettre à jour une brasserie
 *     tags: [Breweries]
 *     description: Modifier les détails d'une brasserie existante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la brasserie
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BreweryRequestBody'
 *     responses:
 *       200:
 *         description: Brasserie mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BreweryResponseBody'
 *       400:
 *         description: Champs requis manquants
 *       404:
 *         description: Brasserie non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", brewerysController.put);

/**
 * @swagger
 * /brewerys/{id}:
 *   delete:
 *     summary: Supprimer une brasserie
 *     tags: [Breweries]
 *     description: Supprimer une brasserie de la base de données
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la brasserie à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Brasserie supprimée avec succès
 *       404:
 *         description: Brasserie non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", brewerysController.delete);
