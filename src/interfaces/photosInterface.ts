// Contenu de la requête lors de la création d'une photo
export interface PhotoReqBody {
    url: string;
    date_uploaded: Date;
    id_beer: number;
}

// Ajout de contenu à BeerReqBody pour les rêquetes concernant la mise à jour d'une photo
export interface UpdatePhotoReqBody extends PhotoReqBody {
    id: number;
}

// Contenu de la réponse, incluant des informations supplémentaires
export interface PhotoResBody {
    id: number;
    url: string;
    date_uploaded: Date;
    id_beer: number;
    created_at: Date;
    updated_at: Date;
}