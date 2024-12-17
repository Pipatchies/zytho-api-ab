import pool from "../config/database";
import { BreweryReqBody, UpdateBreweryReqBody, BreweryResBody } from "../interfaces/brewerysInterface";

export const brewerysModel = {
// Récupération de toutes les brasseries dans la base de données (GET)
get: async (): Promise<BreweryResBody[]> => {
    try {
        const allBrewerysQuery = "SELECT * FROM brewery";
        const { rows } = await pool.query(allBrewerysQuery);
        return rows;   
    } catch (error) {
        throw new Error ("❌ Erreur lors de la récupération des brasseries");
    }
},

// Récupération d'une seule brasserie par son ID
getByID: async (id:number): Promise<BreweryResBody[]> => {
    try {
        const idbreweryQuery = "SELECT * FROM brewery WHERE id = $1"
        const { rows } = await pool.query(idbreweryQuery, [id])
        return rows[0]
    } catch (error) {
        throw new Error ("❌ Erreur lors de la récupération de la brasserie par ID");  
    }
},

// Création d'une nouvelle brasserie
post: async (brewery: BreweryReqBody): Promise<BreweryResBody> => {
    // Validation des données fournies par l'utilisateur
    if (typeof brewery.name !== 'string' || typeof brewery.description !== 'string' || typeof brewery.address !== 'string' || typeof brewery.country !== 'string') {
        throw new Error ("L'ensemble des paramètres doivent être des chaînes de caractères")
    };
    try {
        const newbreweryQuery = "INSERT INTO brewery (name, description, address, country) VALUES ($1, $2, $3, $4) RETURNING *";
        const { rows } = await pool.query(newbreweryQuery, [
            brewery.name,
            brewery.description,
            brewery.address,
            brewery.country
        ]);
        return rows[0];
    } catch (error) {
        throw new Error("❌ Erreur lors de l'insertion de la brasserie dans la base de données");
    }
},

// Mettre à jour une brasserie par son ID
put: async (brewery: UpdateBreweryReqBody): Promise<BreweryResBody> => {
    try {
        const updatebreweryQuery = "UPDATE brewery SET name = $1, description = $2, address = $3, country = $4, updated_at = NOW() WHERE id = $5 RETURNING *";
        const { rows } = await pool.query(updatebreweryQuery, [
            brewery.name,
            brewery.description,
            brewery.address,
            brewery.country,
            brewery.id
        ]);
        return rows[0];
    } catch (error) {
        throw new Error("❌ Erreur lors de la mise à jour de la brasserie")
    }
},

// Supression d'une brasserie par son ID
delete: async (id:number): Promise<BreweryResBody | null> => {
    try {
        const deletebreweryQuery = "DELETE FROM brewery WHERE id = $1";
        const { rows } = await pool.query(deletebreweryQuery, [id]);
        if (rows.length === 0) {
            return null;
        } 
        return rows[0];
    } catch (error) {
        throw new Error("❌ Erreur lors de la suppression de la brasserie");
    }
},
};