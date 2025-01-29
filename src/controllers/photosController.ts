import { Request, Response } from "express";
import { photosModel } from "../models/photosModel";
import { PhotoReqBody, PhotoResBody, UpdatePhotoReqBody } from "../interfaces/photosInterface";

export const photosController = {
    // Controlleur pour récupérer toutes les photos
    get: async (req: Request, res: Response): Promise<void> => {
        try {
            const photos: PhotoResBody[] = await photosModel.get();
            res.status(200).json(photos);
        } catch (error) {
            res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
        }
    },

    // Controlleur pour récupérer une photo par son ID
    getByID: async (req: Request, res: Response): Promise<void> => {
        try {
            const photoId = parseInt(req.params.id, 10);
            const photo: PhotoResBody[] = await photosModel.getByID(photoId);
            if (!photo) {
                res.status(404).json({ message: `Aucune photo trouvée avec l'ID ${photoId}.` });
                return;
            }
            res.status(200).json(photo);
        } catch (error) {
            res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
        }
    },

    // Controlleur pour récupérer les photos d'une bière par son ID
    getByBeerId: async (req: Request, res: Response): Promise<void> => {
        try {
          const beerId = parseInt(req.params.id, 10);
            const photos: PhotoResBody[] = await photosModel.getByBeerId(beerId);
            if (!photos || photos.length === 0) {
                res.status(404).json({ message: `Aucune photo trouvée pour la bière avec l'ID ${beerId}.` });
                return;
            }
            res.status(200).json(photos); 
        } catch (error) {
            res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
        }
    },
    

    // Controlleur pour créer une nouvelle photo
    post: async (req: Request, res: Response): Promise<void> => {
    const newPhoto: PhotoReqBody = req.body
        try {
            const createdPhoto: PhotoResBody = await photosModel.post(newPhoto);
            res.status(201).json(createdPhoto);
        } catch (error) {
            res.status(400).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
        }
    },

    // Controlleur pour update une photo par son ID
    put: async (req: Request, res: Response): Promise<void> => {
        const photoId = parseInt(req.params.id, 10);
        const PhotoToUpdate: UpdatePhotoReqBody = {
        ...req.body,
        id: photoId
        };
    try {
        const updatePhoto: PhotoResBody = await photosModel.put(PhotoToUpdate);
        res.status(200).json(updatePhoto);
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
    } 
    },


    // Controlleur pour supprimer une photo par son ID
    delete: async (req: Request, res: Response): Promise<void> => {
        const photoId = parseInt(req.params.id, 10);
        const deletedphoto = await photosModel.delete(photoId);
        try{
        res.status(200).json({ message: `La photo avec l'ID ${photoId} supprimée avec succès.`, data: deletedphoto} );
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error ? error.message : "Erreur serveur") });
    }
}
};