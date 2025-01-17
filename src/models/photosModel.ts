import pool from "../config/database";
import { PhotoReqBody, UpdatePhotoReqBody, PhotoResBody } from "../interfaces/photosInterface";

export const photosModel = {
// Récupération de toutes les photos dans la base de données (GET)
get: async (): Promise<PhotoResBody[]> => {
    try {
        const allPhotosQuery = "SELECT * FROM photo";
        const { rows } = await pool.query(allPhotosQuery);
        console.log("Photos fetched successfully:", rows);
        return rows;   
    } catch (error) {
        throw new Error ("❌ Erreur lors de la récupération des photos");
    }
},

// Récupération d'une seule photo par son ID
getByID: async (id:number): Promise<PhotoResBody[]> => {
    try {
        const idphotoQuery = "SELECT * FROM photo WHERE id = $1"
        const { rows } = await pool.query(idphotoQuery, [id])
        return rows[0]
    } catch (error) {
        throw new Error ("❌ Erreur lors de la récupération de la photo par ID");  
    }
},

getByBeerId: async (beerId: number): Promise<PhotoResBody[]> => {
    try {
        const idBeerPhotoQuery = "SELECT * FROM photo WHERE id_beer = $1";
        const { rows } = await pool.query(idBeerPhotoQuery, [beerId]);
        return rows;
    } catch (error) {
        throw new Error("❌ Erreur lors de la récupération des photos pour cette bière");
    }
},


// Création d'une nouvelle photo
post: async (photo: PhotoReqBody): Promise<PhotoResBody> => {
    // Validation des données fournies par l'utilisateur
    if (typeof photo.url !== 'string') {
        throw new Error ("L'url doit être une chaîne de caractères")
    }
    if (typeof photo.id_beer !== 'number') {
        throw new Error('L\'ID de la bière doit être un nombre');
    };
    try {
        const newphotoQuery = "INSERT INTO photo (url, date_uploaded, id_beer) VALUES ($1, $2, $3) RETURNING *";
        const { rows } = await pool.query(newphotoQuery, [
            photo.url,
            new Date(),
            photo.id_beer,
        ]);
        return rows[0];
    } catch (error) {
        throw new Error("❌ Erreur lors de l'insertion de la photo dans la base de données");
    }
},

// Mettre à jour une photo par son ID
put: async (photo: UpdatePhotoReqBody): Promise<PhotoResBody> => {
    try {
        const updatephotoQuery = "UPDATE photo SET url = $1, date_uploaded = NOW(), id_beer = $2, updated_at = NOW() WHERE id = $3 RETURNING *";
        const { rows } = await pool.query(updatephotoQuery, [
            photo.url,
            photo.id_beer,
            photo.id
        ]);
        return rows[0];
    } catch (error) {
        throw new Error("❌ Erreur lors de la mise à jour de la photo")
    }
},

// Supression d'une photo par son ID
delete: async (id:number): Promise<PhotoResBody | null> => {
    try {
        const deletephotoQuery = "DELETE FROM photo WHERE id = $1";
        const { rows } = await pool.query(deletephotoQuery, [id]);
        if (rows.length === 0) {
            return null;
        } 
        return rows[0];
    } catch (error) {
        throw new Error("❌ Erreur lors de la suppression de la photo");
    }
},
};