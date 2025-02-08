import { Request, Response } from "express";
import { brewerysModel } from "../models/brewerysModel";
import { BreweryReqBody, BreweryResBody, UpdateBreweryReqBody } from "../interfaces/brewerysInterface";

export const brewerysController = {
    // Controlleur pour récupérer toutes les brasseries
    get: async (req: Request, res: Response): Promise<void> => {
        try {
            const brewerys: BreweryResBody[] = await brewerysModel.get();
            res.status(200).json(brewerys);
        } catch (error) {
            res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
        }
    },

    // Controlleur pour récupérer une brasserie par son ID
    getByID: async (req: Request, res: Response): Promise<void> => {
        try {
            const breweryId = parseInt(req.params.id, 10);
            const brewery: BreweryResBody | null = await brewerysModel.getByID(breweryId);
            if (!brewery) {
                res.status(404).json({ message: `Aucune brasserie trouvée avec l'ID ${breweryId}.` });
                return;
            }
            res.status(200).json(brewery);
        } catch (error) {
            res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
        }
    },

    // Controlleur pour créer une nouvelle brasserie
    post: async (req: Request, res: Response): Promise<void> => {
    const newbrewery: BreweryReqBody = req.body
        try {
            const createdbrewery: BreweryResBody = await brewerysModel.post(newbrewery);
            res.status(201).json(createdbrewery);
        } catch (error) {
            res.status(400).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
        }
    },

    // Controlleur pour update une brasserie par son ID
    put: async (req: Request, res: Response): Promise<void> => {
        const breweryId = parseInt(req.params.id, 10);
        const breweryToUpdate: UpdateBreweryReqBody = {
        ...req.body,
        id: breweryId
        };
    try {
        const updatebrewery: BreweryResBody = await brewerysModel.put(breweryToUpdate);
        res.status(200).json(updatebrewery);
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
    } 
    },


    // Controlleur pour supprimer une brasserie par son ID
    delete: async (req: Request, res: Response): Promise<void> => {
        const breweryId = parseInt(req.params.id, 10);
        const deletedbrewery = await brewerysModel.delete(breweryId);
        try{
        res.status(200).json({ message: `La brasserie avec l'ID ${breweryId} supprimée avec succès.`, data: deletedbrewery } );
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
    }
}
};