import { Request, Response } from "express";
import { ingredientBeerModel } from "../models/ingredientBeerModel";
import { IngredientBeerResBody } from "../interfaces/ingredientBeerInterface";

export const ingredientBeerController = {
    // Controlleur pour récupérer tous les ingrédients d'une bière
    getIngredientsByBeerId: async (req: Request, res: Response): Promise<void> => {
        try {
            const beerId = parseInt(req.params.id, 10);
            const ingredients: IngredientBeerResBody[] = await ingredientBeerModel.getIngredientsByBeerId(beerId); 

            if (ingredients.length === 0) {
                res.status(404).json({ message: `Aucun ingrédient trouvé pour la bière avec l'ID ${beerId}.` });
                return;
            }

            res.status(200).json(ingredients);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : "Erreur serveur" });
        }
    }
};
