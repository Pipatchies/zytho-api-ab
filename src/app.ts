import express, {Application} from 'express';
import { router as beersRoute } from "./routes/beersRoute";
import { router as brewerysRoute } from "./routes/brewerysRoute";
import { router as photosRoute } from "./routes/photosRoute";
import { router as ingredientBeerRoute } from "./routes/ingredientBeerRoute"
import { setupSwagger } from './swagger';


// Configuration de Typescript pour une application Express
const app: Application=express();

// Configurer Swagger
setupSwagger(app);

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Importation de cors
const cors = require('cors');

// Permet les requêtes de toutes les origines
app.use(cors());

// Configuration de la route de base de l'API
const version = "v1";
const path =`/api/${version}`;

// Route de test
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Routes de l'API
app.use(`${path}/beers`, beersRoute);
app.use(`${path}/brewerys`, brewerysRoute)
app.use(`${path}/photos`, photosRoute)
app.use(`${path}/ingredients`, ingredientBeerRoute)

export default app;