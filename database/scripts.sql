CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	email VARCHAR(300) NOT NULL,
	"password" VARCHAR(100) NOT NULL,
	statut BOOLEAN NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ajout de la table brewery

CREATE TABLE brewery (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ajout de la table beer 

CREATE TABLE beer (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    abv FLOAT NOT NULL,
    price INT NOT NULL,
    id_brewery INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_brewery FOREIGN KEY(id_brewery) REFERENCES brewery(id) 
    ON DELETE CASCADE
);

-- Ajout de la table review

CREATE TABLE review(
	id SERIAL PRIMARY KEY,
	rating INT NOT NULL,
	comment TEXT,
	date_created TIMESTAMP NOT NULL,
	id_users INT NOT NULL,
	id_beer INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_users FOREIGN KEY (id_users) REFERENCES users(id)
	ON DELETE CASCADE,
	CONSTRAINT fk_beer FOREIGN KEY(id_beer) REFERENCES beer(id)
	ON DELETE CASCADE
);

-- Ajout de la table favorite 

CREATE TABLE favorite(
	id SERIAL PRIMARY KEY,
	date_added TIMESTAMP NOT NULL,
	id_users INT NOT NULL,
	id_beer INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_users FOREIGN KEY (id_users) REFERENCES users(id)
	ON DELETE CASCADE,
	CONSTRAINT fk_beer FOREIGN KEY(id_beer) REFERENCES beer(id)
	ON DELETE CASCADE
);

-- Ajout de la table photos

CREATE TABLE photos(
    id SERIAL PRIMARY KEY,
    "url" VARCHAR(1000) NOT NULL,
    date_uploaded TIMESTAMP NOT NULL,
    id_beer INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_beer FOREIGN KEY (id_beer) REFERENCES beer(id)
    ON DELETE CASCADE
);

-- Ajout de la table category

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    flavor VARCHAR(100) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ajout de la table ingredient

CREATE TABLE ingredient(
	id SERIAL PRIMARY KEY,
	"name" VARCHAR(100) NOT NULL,
	"type" VARCHAR(100) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ajout de la table associative category_beer

CREATE TABLE category_beer (
    color VARCHAR(100) NOT NULL,
    id_category INT NOT NULL,
    id_beer INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY(id_category) REFERENCES category(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_beer FOREIGN KEY(id_beer) REFERENCES beer(id)
    ON DELETE CASCADE
);

-- Ajout de la table associative ingredient_beer

CREATE TABLE ingredient_beer(
	id SERIAL PRIMARY KEY,
	pourcent FLOAT NOT NULL,
	id_ingredient INT NOT NULL,
	id_beer INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_ingredient FOREIGN KEY(id_ingredient) REFERENCES ingredient(id)
	ON DELETE CASCADE,
	CONSTRAINT fk_beer FOREIGN KEY(id_beer) REFERENCES beer(id)
	ON DELETE CASCADE
);

-- Création procédure stockée permettant à un utilisateur de noter une bière. Si l'utilisateur a déjà noté cette bière,
-- la note est mise à jour ; sinon, une nouvelle note est ajoutée.

CREATE OR REPLACE FUNCTION beerReview(
    r_users_id INT,
    r_beer_id INT,
    new_rating INT,
    new_comment TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM review
        WHERE id_users = r_users_id
        AND id_beer = r_beer_id
    ) THEN
        UPDATE review
        SET rating = new_rating,
            "comment" = new_comment,
            updated_at = CURRENT_TIMESTAMP
        WHERE id_users = r_users_id
        AND id_beer = r_beer_id;
    ELSE
        INSERT INTO review (id_users, id_beer, rating, "comment", created_at, updated_at)
        VALUES (r_users_id, r_beer_id, new_rating, new_comment, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    END IF;
END;
$$ LANGUAGE plpgsql;



-- Création trigger pour vérifier que l'ABV (taux d'alcool) est compris entre 0 et 20 avant l'ajout de chaque bière.

CREATE OR REPLACE FUNCTION verification_abv()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.abv < 0 OR NEW.abv > 20 THEN
    RAISE EXCEPTION 'Le degrès d''alcool (ABV) doit être compris entre 0 et 20. Le degrès d''alcool de votre bière n''est pas correct car il fait : %', NEW.abv;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_abv
BEFORE INSERT OR UPDATE ON beer
FOR EACH ROW
EXECUTE FUNCTION verification_abv();

-- Insertion de données dans la table users
INSERT INTO users (first_name, last_name, email, "password", statut)
VALUES
('Alice', 'Dupont', 'alice.dupont@example.com', 'password123', TRUE),
('Bob', 'Martin', 'bob.martin@example.com', 'password456', TRUE),
('Charlie', 'Durand', 'charlie.durand@example.com', 'password789', FALSE);

-- Insertion de données dans la table brewery
INSERT INTO brewery ("name", "description", "address", country)
VALUES
('BrewDog', 'BrewDog est une brasserie écossaise emblématique, célèbre pour ses bières innovantes et audacieuses.', 'Unit 3, 85 Dalmarnock Rd, Glasgow', 'Écosse'),
('Lagunitas Brewing Company', 'Lagunitas est une brasserie américaine reconnue pour ses bières artisanales, en particulier ses IPA.', '1280 N McDowell Blvd, Petaluma', 'États-Unis'),
('Brasserie Dupont', 'La Brasserie Dupont est une brasserie belge traditionnelle, célèbre pour ses bières de fermentation haute.', 'Rue de l’Industrie 1, Tourpes', 'Belgique');

-- Insertion de données dans la table beer
INSERT INTO beer ("name", "description", abv, price, id_brewery)
VALUES
('Punk IPA', 'Une IPA audacieuse et fruitée avec des notes d’agrumes et de pin.', 5.6, 12, 1),
('Lagunitas IPA', 'Une IPA très houblonnée avec un goût INTense de pamplemousse et de résine.', 6.2, 14, 2),
('Saison Dupont', 'Une bière saison belge classique avec une saveur épicée et des notes de levure.', 6.5, 15, 3),
('Hazy Jane', 'Une IPA nébuleuse, avec des arômes d’agrumes et de fruits tropicaux.', 7.2, 16, 1),  
('IPA Maximus', 'Une IPA avec un goût de pamplemousse et une amertume bien marquée.', 7.5, 17, 2),  
('La Chouffe', 'Une bière blonde belge, légèrement fruitée avec un goût épicé unique.', 8.0, 18, 3),
('Dead Pony Club', 'Une pale ale rafraîchissante et légère avec des notes de citron et de melon.', 4.0, 11, 1),  
('Elvis Juice', 'Une IPA de style américain avec des notes de pamplemousse et une amertume puissante.', 6.5, 14, 1),  
('Lagunitas IPA', 'Une IPA classique et bien équilibrée, avec des saveurs de pin et de fruits tropicaux.', 6.2, 13, 2),  
('Little Sumpin’ Sumpin’ Ale', 'Une bière américaine de type pale ale avec une touche de douceur et un corps léger.', 7.5, 15, 2),  
('Météor Pils', 'Une pilsner légère et fruitée, avec une amertume bien présente et un goût agréable.', 5.2, 13, 3),  
('Bières de Noël', 'Une bière d’hiver épicée et riche, parfaite pour les soirées fraîches.', 6.0, 16, 3);  

-- Insertion de données dans la table review
INSERT INTO review (rating, comment, date_created, id_users, id_beer)
VALUES
(5, 'Amazing beer! Very refreshing.', '2024-11-01 10:00:00', 1, 1),
(4, 'A good beer, but a bit too bitter for my taste.', '2024-11-02 15:00:00', 2, 2),
(3, 'It was okay, but I prefer something stronger.', '2024-11-03 18:30:00', 3, 3);

-- Insertion de données dans la table favorite
INSERT INTO favorite (date_added, id_users, id_beer)
VALUES
('2024-11-01 11:00:00', 1, 1),
('2024-11-02 16:00:00', 2, 2),
('2024-11-03 19:00:00', 3, 3),
('2024-11-06 20:00:00', 3, 2);

-- Insertion de données dans la table photos
INSERT INTO photos ("url", date_uploaded, id_beer)
VALUES
('https://static.unepetitemousse.fr/produits/bieres/brewdog/brewdog-PunkIPA-2021_1800w.jpg', '2024-11-01 10:30:00', 1),
('https://media.carrefour.fr/medias/67306fad6af7473b958737c5e5bd81dc/p_1500x1500/00723830000100_H1N1_s00.png', '2024-11-02 16:30:00', 2),
('https://bieronomy.com/25829-large_default/dupont-saison-dupont-33-cl.jpg', '2024-11-03 19:30:00', 3),
('https://www.brewdog.com/media/39849/hazy-jane-ipa.jpg', '2024-11-11 09:30:00', 4),
('https://www.lagunitas.com/sites/default/files/styles/product_full/public/ipa_maximus.jpg?itok=UbnjOZ7Z', '2024-11-12 14:20:00', 5), 
('https://www.brasserie-dupont.com/produits/la-chouffe.jpg', '2024-11-13 16:50:00', 6), 
('https://www.brewdog.com/media/38122/dead-pony-club-ipa-500ml-1.jpg', '2024-11-05 14:00:00', 7), 
('https://www.brewdog.com/media/39384/elvis-juice-ipa.jpg', '2024-11-06 11:15:00', 8),  
('https://www.lagunitas.com/sites/default/files/styles/product_full/public/lagunitas-ipa.png?itok=QyqGTqEd', '2024-11-07 09:20:00', 9),  
('https://www.lagunitas.com/sites/default/files/styles/product_full/public/little-sumpin-sumpin-ale.jpg?itok=w9k8PLMK', '2024-11-08 13:30:00', 10),  
('https://www.biere-metier.com/produits/meteor-pilsner.jpg', '2024-11-09 17:45:00', 11),  
('https://brasserie-dupont.com/produits/biere-de-noel.jpg', '2024-11-10 12:10:00', 12);  

-- Insertion de données dans la table category
INSERT INTO category ("name", flavor)
VALUES
('Lager', 'Crisp and refreshing'),
('IPA', 'Bitter with citrus notes'),
('Saison', 'Spicy and fruity'),
('Belgian Ale', 'Fruity and spicy'),  
('Pale Ale', 'Hoppy and fruity'),  
('Amber Ale', 'Sweet and malty'),  
('Pilsner', 'Light and crisp'), 
('Winter Ale', 'Rich and spicy'); 

-- Insertion de données dans la table ingredient
INSERT INTO ingredient ("name", "type")
VALUES
('Hops', 'Flavoring'),
('Malt', 'Base'),
('Yeast', 'Fermentation'),
('Water', 'Base'),
('Tropical fruits', 'Flavoring'),  
('Pepper', 'Flavoring'),
('Citrus peel', 'Flavoring'),  
('Barley', 'Base');  

-- Insertion de données dans la table associative category_beer
INSERT INTO category_beer (color, id_category, id_beer)
VALUES
('Golden', 2, 1), 
('Amber', 2, 2), 
('Golden', 3, 3),
('Hazy', 2, 4),
('Amber', 2, 5),  
('Golden', 3, 6), 
('Golden', 4, 7),  
('Orange', 4, 8), 
('Golden', 5, 9),  
('Golden', 5, 10),  
('Yellow', 6, 11),  
('Amber', 7, 12);   

-- Insertion de données dans la table associative ingredient_beer
INSERT INTO ingredient_beer (pourcent, id_ingredient, id_beer)
VALUES
(50, 1, 1),
(40, 2, 1),
(10, 3, 1), 
(60, 1, 2),
(30, 2, 2),  
(10, 4, 2),  
(70, 1, 3),  
(20, 2, 3),  
(10, 4, 3),
(50, 1, 4),  -- Hazy Jane
(40, 2, 4),  
(10, 3, 4), 
(60, 1, 5),  
(30, 2, 5),  
(10, 4, 5),  
(70, 1, 6),  
(20, 2, 6),  
(10, 7, 6),   
(60, 1, 7),  
(30, 2, 7),
(10, 5, 7),
(70, 1, 8),  
(20, 2, 8),
(10, 5, 8),
(50, 1, 9),  
(40, 2, 9),
(10, 4, 9),
(60, 1, 10),  
(30, 2, 10),
(10, 6, 10),
(70, 1, 11),  
(20, 2, 11),
(10, 4, 11),
(60, 2, 12),  
(40, 3, 12);