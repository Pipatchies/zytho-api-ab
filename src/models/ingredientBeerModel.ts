import pool from "../config/database"; 
import { IngredientBeerResBody } from "../interfaces/ingredientBeerInterface"; 

export const ingredientBeerModel = {
    getIngredientsByBeerId: async (beerId: number): Promise<IngredientBeerResBody[]> => {
        try {
            const allIngredientOfBeerQuery = `
                SELECT 
                    i."name" AS ingredient_name,
                    i."type" AS ingredient_type,
                    ib.pourcent AS ingredient_percentage
                FROM
                    beer b
                JOIN 
                    ingredient_beer ib ON b.id = ib.id_beer
                JOIN
                    ingredient i ON i.id = ib.id_ingredient
                WHERE
                    b.id = $1;
            `;
            const { rows } = await pool.query(allIngredientOfBeerQuery, [beerId]);
            return rows; 
        } catch (error) {
            throw new Error("❌ Erreur lors de la récupération des ingrédients pour cette bière");
        }
    }
};
