import pool from "../config/database";
import { BeerReqBody } from "../interfaces/beerInterface";
import { BeerResBody, UpdateBeerReqBody } from "../interfaces/beerInterface";

export const beersModel = {
// Récupération de toutes les bières dans la base de données (GET)
get: async (): Promise<BeerResBody[]> => {
    try {
        const allBeersQuery = "SELECT * FROM beer";
        const { rows } = await pool.query(allBeersQuery);
        return rows;   
    } catch (error) {
        throw new Error ("❌ Erreur lors de la récupération des bières");
    }
},

// Récupération d'une seule bière par son ID
getByID: async (id:number): Promise<BeerResBody | null> => {
    try {
        const idBeerQuery = "SELECT * FROM beer WHERE id = $1"
        const { rows } = await pool.query(idBeerQuery, [id])
        return rows[0];
    } catch (error) {
        throw new Error ("❌ Erreur lors de la récupération de la bière par ID");  
    }
},

// Récupération des bières par ID de brasserie (nouvelle requête)
getByBrewery: async (breweryId: number): Promise<BeerResBody[]> => {
    try {
        const beersByBreweryQuery = "SELECT * FROM beer WHERE id_brewery = $1";
        const { rows } = await pool.query(beersByBreweryQuery, [breweryId]);
        return rows;
    } catch (error) {
        throw new Error("❌ Erreur lors de la récupération des bières de la brasserie");
    }
},

// Création d'une nouvelle bière
post: async (beer: BeerReqBody): Promise<BeerResBody> => {
    // Validation des données fournies par l'utilisateur
    if (typeof beer.name !== 'string' || typeof beer.description !== 'string') {
        throw new Error ("Le nom et la description doivent être des chaînes de caractères")
    }
    if (typeof beer.abv !== 'number' || typeof beer.price !== 'number' || typeof beer.id_brewery !== 'number') {
        throw new Error('ABV, le prix et l\'ID de la brasserie doivent être des nombres');
    };
    try {
        const newBeerQuery = "INSERT INTO beer (name, description, abv, price, id_brewery) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const { rows } = await pool.query(newBeerQuery, [
            beer.name,
            beer.description,
            beer.abv,
            beer.price,
            beer.id_brewery,
        ]);
        return rows[0];
    } catch (error) {
        throw new Error("❌ Erreur lors de l'insertion de la bière dans la base de données");
    }
},

// Mettre à jour une bière par son ID
put: async (beer: UpdateBeerReqBody): Promise<BeerResBody> => {
    try {
        const updateBeerQuery = "UPDATE beer SET name = $1, description = $2, abv = $3, price = $4, id_brewery = $5, updated_at = NOW() WHERE id = $6 RETURNING *";
        const { rows } = await pool.query(updateBeerQuery, [
            beer.name,
            beer.description,
            beer.abv,
            beer.price,
            beer.id_brewery,
            beer.id
        ]);
        return rows[0];
    } catch (error) {
        throw new Error("❌ Erreur lors de la mise à jour de la bière")
    }
},

// Supression d'une bière par son ID
delete: async (id:number): Promise<BeerResBody | null> => {
    try {
        const deleteBeerQuery = "DELETE FROM beer WHERE id = $1";
        const { rows } = await pool.query(deleteBeerQuery, [id]);
        if (rows.length === 0) {
            return null;
        } 
        return rows[0];
    } catch (error) {
        throw new Error("❌ Erreur lors de la suppression de la bière");
    }
},
};