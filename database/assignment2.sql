
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS classification CASCADE;


CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    description TEXT,
    inv_image TEXT,
    inv_thumbnail TEXT,
    classification_id INT REFERENCES classification(classification_id) ON DELETE CASCADE
);


CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_type VARCHAR(20) DEFAULT 'User'
);


INSERT INTO account (first_name, last_name, email, password) 
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


UPDATE account
SET account_type = 'Admin'
WHERE first_name = 'Tony' AND last_name = 'Stark';


DELETE FROM account
WHERE first_name = 'Tony' AND last_name = 'Stark';

)
INSERT INTO classification (classification_name) VALUES ('Sport') 
ON CONFLICT (classification_name) DO NOTHING;


INSERT INTO inventory (make, model, description, inv_image, inv_thumbnail, classification_id)
VALUES ('GM', 'Hummer', 'small interiors', '/images/hummer.jpg', '/images/hummer_thumb.jpg', 
       (SELECT classification_id FROM classification WHERE classification_name = 'Sport'))
ON CONFLICT DO NOTHING;


UPDATE inventory
SET description = REPLACE(description, 'small interiors', 'a huge interior')
WHERE make = 'GM' AND model = 'Hummer';


SELECT i.make, i.model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';


UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
