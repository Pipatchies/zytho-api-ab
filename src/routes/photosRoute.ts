import { Router } from 'express';
import { photosController } from '../controllers/photosController';

export const router = Router();

/**
 * @swagger
 * tags:
 *   name: Photos
 *   description: Gestion des photos
 */
/**
 * @swagger
 * /photos:
 *   post:
 *     summary: Créer une nouvelle photo
 *     tags: [Photos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhotoRequestBody'
 *     responses:
 *       201:
 *         description: La photo a été créée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhotoResponseBody'
 *       500:
 *         description: Erreur serveur
 */
router.post("/", photosController.post);

/**
 * @swagger
 * /photos:
 *   get:
 *     summary: Récupérer toutes les photos
 *     tags: [Photos]
 *     responses:
 *       200:
 *         description: Liste de toutes les photos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PhotoResponseBody'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", photosController.get);

/**
 * @swagger
 * /photos/{id}:
 *   get:
 *     summary: Récupérer une photo par ID
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de la photo
 *     responses:
 *       200:
 *         description: Les détails de la photo correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhotoResponseBody'
 *       404:
 *         description: Photo introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", photosController.getByID);

/**
 * @swagger
 * /photos/byBeer/{id}:
 *   get:
 *     summary: Récupérer les photos associées à une bière spécifique par son ID
 *     tags: [Photos]
 *     parameters:
 *       - in: query
 *         name: beerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de la bière pour laquelle récupérer les photos
 *     responses:
 *       200:
 *         description: Liste des photos associées à la bière
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PhotoResponseBody'
 *       400:
 *         description: L'ID de la bière est manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.get("/byBeer/:id", photosController.getByBeerId);


/**
 * @swagger
 * /photos/{id}:
 *   put:
 *     summary: Mettre à jour une photo par ID
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de la photo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhotoRequestBody'
 *     responses:
 *       200:
 *         description: La photo a été mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhotoResponseBody'
 *       404:
 *         description: Photo introuvable
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", photosController.put);

/**
 * @swagger
 * /photos/{id}:
 *   delete:
 *     summary: Supprimer une photo par ID
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de la photo
 *     responses:
 *       204:
 *         description: La photo a été supprimée avec succès.
 *       404:
 *         description: Photo introuvable
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", photosController.delete);
