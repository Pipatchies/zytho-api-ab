import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "🍺 API de Bières",
            version: "1.0.0",
            description: "Documentation de l\'API pour gérer les bières",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            },
        ],
        components: {
            schemas: {
              BeerRequestBody: {
                type: "object",
                required: ["name", "description", "abv", "price", "id_brewery"],
                properties: {
                  name: {
                    type: "string",
                    description: "Nom de la bière",
                  },
                  description: {
                    type: "string",
                    description: "Description de la bière",
                  },
                  abv: {
                    type: "number",
                    description: "Teneur en alcool (en pourcentage)",
                  },
                  price: {
                    type: "number",
                    description: "Prix de la bière",
                  },
                  id_brewery: {
                    type: "integer",
                    description: "ID de la brasserie associée",
                  },
                },
              },
              BeerResponseBody: {
                type: "object",
                properties: {
                  id_beer: {
                    type: "integer",
                    description: "ID unique de la bière",
                  },
                  name: {
                    type: "string",
                    description: "Nom de la bière",
                  },
                  description: {
                    type: "string",
                    description: "Description de la bière",
                  },
                  abv: {
                    type: "number",
                    description: "Teneur en alcool (en pourcentage)",
                  },
                  price: {
                    type: "number",
                    description: "Prix de la bière",
                  },
                  id_brewery: {
                    type: "integer",
                    description: "ID de la brasserie associée",
                  },
                  created_at: {
                    type: "string",
                    format: "date-time",
                    description: "Date de création de la bière",
                  },
                  updated_at: {
                    type: "string",
                    format: "date-time",
                    description: "Date de dernière modification de la bière",
                  },
                },
              },
              BreweryRequestBody: {
                type: "object",
                required: ["name", "country"],
                properties: {
                  name: {
                    type: "string",
                    description: "Nom de la brasserie",
                  },
                  country: {
                    type: "string",
                    description: "Pays où se trouve la brasserie",
                  },
                },
              },
              BreweryResponseBody: {
                type: "object",
                properties: {
                  id_brewery: {
                    type: "integer",
                    description: "ID unique de la brasserie",
                  },
                  name: {
                    type: "string",
                    description: "Nom de la brasserie",
                  },
                  country: {
                    type: "string",
                    description: "Pays où se trouve la brasserie",
                  },
                  created_at: {
                    type: "string",
                    format: "date-time",
                    description: "Date de création de la brasserie",
                  },
                  updated_at: {
                    type: "string",
                    format: "date-time",
                    description: "Date de dernière modification de la brasserie",
                  },
                },
              },
              PhotoRequestBody: {
                type: "object",
                required: ["url", "date_uploaded","id_beer"],
                properties: {
                  url: {
                    type: "string",
                    description: "URL de la photo",
                  },
                  date_uploaded: {
                    type: "string",
                    format: "date-time",
                    description: "Date où la photo a été téléchargée",
                  },
                  id_beer: {
                    type: "integer",
                    description: "ID de la bière associée",
                  },
                },
              },
              PhotoResponseBody: {
                type: "object",
                properties: {
                  id_photo: {
                    type: "integer",
                    description: "ID unique de la photo",
                  },
                  url: {
                    type: "string",
                    description: "URL de la photo",
                  },
                    date_uploaded: {
                      type: "string",
                      format: "date-time",
                      description: "Date où la photo a été téléchargée",
                    },
                    id_beer: {
                      type: "integer",
                      description: "ID de la bière associée",
                    },
                  created_at: {
                    type: "string",
                    format: "date-time",
                    description: "Date de création de la photo",
                  },
                  updated_at: {
                    type: "string",
                    format: "date-time",
                    description: "Date de dernière modification de la photo",
                  },
                },
              },
            },
          },          
        },
    apis: ["./src/**/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};