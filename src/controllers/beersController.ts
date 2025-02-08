import { Request, Response } from "express";
import { beersModel } from "../models/beersModel";
import { BeerReqBody, BeerResBody, UpdateBeerReqBody } from "../interfaces/beerInterface";

export const beersController = {
    // Controlleur pour récupérer toutes les bières
    get: async (req: Request, res: Response): Promise<void> => {
        try {
            const beers: BeerResBody[] = await beersModel.get();
            res.status(200).json(beers);
        } catch (error) {
            res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
        }
    },

    // Controlleur pour récupérer une bière par son ID
    getByID: async (req: Request, res: Response): Promise<void> => {
        try {
            const beerId = parseInt(req.params.id, 10);
            const beer: BeerResBody | null = await beersModel.getByID(beerId);
            if (!beer) {
                res.status(404).json({ message: `Aucune bière trouvée avec l'ID ${beerId}.` });
                return;
            }
            res.status(200).json(beer);
        } catch (error) {
            res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
        }
    },

    // Controlleur pour créer une nouvelle bière
    post: async (req: Request, res: Response): Promise<void> => {
    const newBeer: BeerReqBody = req.body
        try {
            const createdBeer: BeerResBody = await beersModel.post(newBeer);
            res.status(201).json(createdBeer);
        } catch (error) {
            res.status(400).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
        }
    },

    // Controlleur pour update une bière par son ID
    put: async (req: Request, res: Response): Promise<void> => {
        const beerId = parseInt(req.params.id, 10);
        const BeerToUpdate: UpdateBeerReqBody = {
        ...req.body,
        id: beerId
        };
    try {
        const updateBeer: BeerResBody = await beersModel.put(BeerToUpdate);
        res.status(200).json(updateBeer);
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
    } 
    },


    // Controlleur pour supprimer une bière par son ID
    delete: async (req: Request, res: Response): Promise<void> => {
        const beerId = parseInt(req.params.id, 10);
        const deletedbeer = await beersModel.delete(beerId);
        try{
        res.status(200).json({ message: `Bière avec l'ID ${beerId} supprimée avec succès.`, data: deletedbeer } );
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
    }
}
};