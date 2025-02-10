import pool from "../config/database"; 
import { IngredientBeerResBody } from "../interfaces/ingredientBeerInterface"; 

export const ingredientBeerModel = {
    getIngredientsByBeerId: async (beerId: number): Promise<IngredientBeerResBody[]> => {
        try {
            const allIngredientOfBeerQuery = `
                SELECT 
                    ib.id_ingredient,  -- Ajout de l'ID de l'ingrédient
                    i."name" AS ingredient_name,
                    i."type" AS ingredient_type,
                    ib.pourcent AS ingredient_percentage
                FROM
                    ingredient_beer ib
                JOIN
                    ingredient i ON i.id = ib.id_ingredient
                WHERE
                    ib.id_beer = $1;
            `;
            const { rows } = await pool.query(allIngredientOfBeerQuery, [beerId]);
            return rows; 
        } catch (error) {
            throw new Error("❌ Erreur lors de la récupération des ingrédients pour cette bière");
        }
    }
};
