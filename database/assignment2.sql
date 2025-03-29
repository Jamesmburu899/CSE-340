-- Task 1: Insert the following new record to the account table
-- Note: account_id and account_type will be auto-generated
INSERT INTO account (first_name, last_name, email, password) 
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Task 2: Modify Tony Stark's record to change the account_type to "Admin"
UPDATE account
SET account_type = 'Admin'
WHERE first_name = 'Tony' AND last_name = 'Stark';

-- Task 3: Delete Tony Stark's record from the database
DELETE FROM account
WHERE first_name = 'Tony' AND last_name = 'Stark';

-- Task 4: Modify the "GM Hummer" record to change the description from "small interiors" to "a huge interior"
UPDATE inventory
SET description = REPLACE(description, 'small interiors', 'a huge interior')
WHERE make = 'GM' AND model = 'Hummer';

-- Task 5: Use an inner join to select make and model from the inventory table and classification_name from the classification table
SELECT i.make, i.model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Task 6: Update all records in the inventory table to add "/vehicles" to the middle of the file path in inv_image and inv_thumbnail
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
