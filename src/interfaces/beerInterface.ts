// Contenu de la requête lors de la création d'une bière
export interface BeerReqBody {
    name: string;
    description: string;
    abv: number;
    price: number;
    id_brewery: number;
}

// Ajout de contenu à BeerReqBody pour les rêquetes concernant la mise à jour d'une bière
export interface UpdateBeerReqBody extends BeerReqBody {
    id: number;
}

// Contenu de la réponse, incluant des informations supplémentaires
export interface BeerResBody {
    id: number;
    name: string;
    description: string;
    abv: number;
    price: number;
    id_brewery: number;
    created_at: Date;
  	updated_at: Date;
}
