import express, {Application} from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { router as beersRoute } from "./routes/beersRoute";

// Configuration de Typescript pour une application Express
const app: Application=express();

// COnfiguration Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Bières',
            version: '1.0.0',
            description: 'Documentation de l\'API pour gérer les bières',
          },
        },
        apis: ['./src/**/*.ts'],
      };

// Génération de la documentation Swagger
const swaggerSpec = swaggerJSDoc(options);

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Middleware pour servir l'interface Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuration de la route de base de l'API
const version = "v1";
const path =`/api/${version}`;

// Route de test
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Routes de l'API
app.use(`${path}/beers`, beersRoute);

export default app;