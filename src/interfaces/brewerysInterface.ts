// Contenu de la requête lors de la création d'une brasserie
export interface BreweryReqBody {
    name: string;
    description: string;
    address: string;
    country: string;
}

// Ajout de contenu à BeerReqBody pour les rêquetes concernant la mise à jour d'une brasserie
export interface UpdateBreweryReqBody extends BreweryReqBody {
    id: number;
}

// Contenu de la réponse, incluant des informations supplémentaires
export interface BreweryResBody {
    id: number;
    name: string;
    description: string;
    address: string;
    country: string;
    created_at: Date;
  	updated_at: Date;
}