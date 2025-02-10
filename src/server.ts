import dotenv from 'dotenv';
dotenv.config();
import pool from './config/database'
import app from './app'

// Écoute des événements de la base de données avant la tentative de connexion
pool.on('connect', () => {
    console.log("🔗 Vous êtes bien connecté.e à la base de données");
});

pool.on("error", (err) => {
    console.error("❌ Error : la connexion a la base de données ne fonctionne pas", err);
    process.exit(1);
});

// Connexion à la base de données zythologue_db
pool.connect()
    .then(() => {
        const PORT = 3000;

        app.listen(PORT, () => {
            console.log(`🌐 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error("❌ Erreur de connexion à PostgreSQL", err));
