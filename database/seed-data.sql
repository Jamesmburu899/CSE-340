-- Insert classifications
INSERT INTO public.classification (classification_name)
VALUES 
    ('Custom'),
    ('Sport'),
    ('SUV'),
    ('Truck'),
    ('Sedan');

-- Insert inventory items
INSERT INTO public.inventory (
    inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, 
    inv_price, inv_miles, inv_color, classification_id
) VALUES (
    'DMC', 'DeLorean', 1981,
    'Back to the Future style. Unique gull-wing doors, stainless steel body.',
    '/images/vehicles/delorean.jpg',
    '/images/vehicles/delorean-tn.jpg',
    39999.99, 12345, 'Silver',
    1
);

INSERT INTO public.inventory (
    inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, 
    inv_price, inv_miles, inv_color, classification_id
) VALUES (
    'Ford', 'F-150', 2021,
    'Powerful pickup truck with excellent towing capacity.',
    '/images/vehicles/f150.jpg',
    '/images/vehicles/f150-tn.jpg',
    45999.99, 5000, 'Red',
    4
);