-- Insert classification data if not exists
INSERT INTO public.classification (classification_id, classification_name)
VALUES 
  (1, 'Sedan'),
  (2, 'SUV'),
  (3, 'Truck')
ON CONFLICT (classification_id) DO NOTHING;

-- Insert Sedan inventory
INSERT INTO public.inventory (
  inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
)
gVALUES
  ('Toyota', 'Camry SE', 2023, '2.5L 4-Cylinder | Automatic | Rearview Camera, Lane Assist, Sport Trim', '/images/sedan1.jpg', '/images/sedan1.jpg', 26900, 12000, 'Silver', 1),
  ('Honda', 'Accord Sport', 2022, '1.5L Turbo | Touchscreen, Apple CarPlay, Premium Sound', '/images/sedan2.jpg', '/images/sedan2.jpg', 25400, 18400, 'Gray', 1),
  ('Nissan', 'Altima SV', 2021, 'AWD | ProPILOT Assist, Dual-Zone Climate Control', '/images/sedan3.jpg', '/images/sedan3.jpg', 23950, 22100, 'Charcoal Black', 1),
  ('Hyundai', 'Elantra SEL', 2020, 'Smartstream IVT, Backup Cam, Bluetooth', '/images/sedan4.jpg', '/images/sedan4.jpg', 18700, 30500, 'Red', 1),
  ('Mazda', '6 Touring', 2023, 'Heated Seats, Blind Spot Monitoring', '/images/sedan5.jpg', '/images/sedan5.jpg', 27200, 14300, 'Pearl White', 1),
  ('Kia', 'K5 LXS', 2021, '1.6L Turbo | Smart Cruise Control, Wireless Android Auto', '/images/sedan6.jpg', '/images/sedan6.jpg', 22300, 21000, 'Blue', 1),
  ('Volkswagen', 'Passat R-Line', 2020, 'Leather Interior | Heated Seats | Navigation', '/images/sedan7.jpg', '/images/sedan7.jpg', 20800, 25000, 'Black', 1);

-- Insert SUV inventory
INSERT INTO public.inventory (
  inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
)
VALUES
  ('Toyota', 'RAV4 XLE AWD', 2023, 'AWD | Sunroof, Blind Spot Monitor', '/images/suv1.jpg', '/images/suv1.jpg', 30700, 14500, 'Blue', 2),
  ('Honda', 'CR-V EX-L', 2021, 'Leather Seats | Apple CarPlay | Backup Camera', '/images/suv2.jpg', '/images/suv2.jpg', 28600, 19000, 'Silver', 2),
  ('Mazda', 'CX-5 Touring', 2022, 'AWD | Bose Premium Sound', '/images/suv3.jpg', '/images/suv3.jpg', 29100, 21300, 'Red', 2),
  ('Nissan', 'Rogue SV', 2020, 'Navigation | Bluetooth', '/images/suv4.jpg', '/images/suv4.jpg', 23800, 33000, 'White', 2),
  ('Hyundai', 'Tucson SEL', 2023, 'Remote Start | Lane Keeping Assist', '/images/suv5.jpg', '/images/suv5.jpg', 27900, 12000, 'Gray', 2),
  ('Subaru', 'Forester Premium', 2021, 'AWD | Rear Cross Traffic Alert', '/images/suv6.jpg', '/images/suv6.jpg', 25000, 24000, 'Green', 2),
  ('Chevrolet', 'Equinox LT', 2022, 'Touchscreen | Alloys', '/images/suv7.jpg', '/images/suv7.jpg', 24700, 19800, 'Black', 2),
  ('Ford', 'Escape SE Hybrid', 2021, 'Hybrid Efficiency', '/images/suv8.jpg', '/images/suv8.jpg', 26200, 17900, 'Gray', 2),
  ('Kia', 'Sportage EX', 2023, 'Panoramic Roof', '/images/suv9.jpg', '/images/suv9.jpg', 28450, 9800, 'Silver', 2);

-- Insert Truck inventory
INSERT INTO public.inventory (
  inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
)
VALUES
  ('Ford', 'F-150 XLT 4x4', 2023, 'SuperCrew | 5.0L V8 | Towing Package', '/images/track1.jpg', '/images/track1.jpg', 42800, 15000, 'Blue', 3),
  ('Toyota', 'Tacoma TRD Sport', 2022, '4WD | Dual Climate', '/images/track2.jpg', '/images/track2.jpg', 37500, 17000, 'Red', 3),
  ('Chevrolet', 'Silverado LTZ', 2021, 'Z71 Off-Road | Chrome Package', '/images/Truck.jpg', '/images/Truck.jpg', 39200, 23000, 'Silver', 3);