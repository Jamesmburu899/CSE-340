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
VALUES
  ('Toyota', 'Camry SE', 2023, '2.5L 4-Cylinder | Automatic | Rearview Camera, Lane Assist, Sport Trim', '/images/vehicles/camry.jpg', '/images/vehicles/camry-tn.jpg', 26900, 12000, 'Silver', 1),
  ('Honda', 'Accord Sport', 2022, '1.5L Turbo | Touchscreen, Apple CarPlay, Premium Sound', '/images/vehicles/accord.jpg', '/images/vehicles/accord-tn.jpg', 25400, 18400, 'Gray', 1),
  ('Nissan', 'Altima SV', 2021, 'AWD | ProPILOT Assist, Dual-Zone Climate Control', '/images/vehicles/altima.jpg', '/images/vehicles/altima-tn.jpg', 23950, 22100, 'Charcoal Black', 1),
  ('Hyundai', 'Elantra SEL', 2020, 'Smartstream IVT, Backup Cam, Bluetooth', '/images/vehicles/elantra.jpg', '/images/vehicles/elantra-tn.jpg', 18700, 30500, 'Red', 1),
  ('Mazda', '6 Touring', 2023, 'Heated Seats, Blind Spot Monitoring', '/images/vehicles/mazda6.jpg', '/images/vehicles/mazda6-tn.jpg', 27200, 14300, 'Pearl White', 1),
  ('Kia', 'K5 LXS', 2021, '1.6L Turbo | Smart Cruise Control, Wireless Android Auto', '/images/vehicles/k5.jpg', '/images/vehicles/k5-tn.jpg', 22300, 21000, 'Blue', 1),
  ('Volkswagen', 'Passat R-Line', 2020, 'Leather Interior | Heated Seats | Navigation', '/images/vehicles/passat.jpg', '/images/vehicles/passat-tn.jpg', 20800, 25000, 'Black', 1),
  ('Chevrolet', 'Malibu LT', 2022, '1.5L Turbo | Remote Start | Backup Camera, Alloy Wheels', '/images/vehicles/malibu.jpg', '/images/vehicles/malibu-tn.jpg', 21400, 17600, 'Silver', 1),
  ('Subaru', 'Legacy Premium', 2021, 'AWD | EyeSight Assist | Heated Seats, Adaptive Cruise', '/images/vehicles/legacy.jpg', '/images/vehicles/legacy-tn.jpg', 24100, 19900, 'Blue', 1),
  ('Ford', 'Fusion Titanium', 2023, '2.0L EcoBoost | Leather Seats, Premium Audio, Sunroof', '/images/vehicles/fusion.jpg', '/images/vehicles/fusion-tn.jpg', 28300, 10100, 'Black', 1);

-- Insert SUV inventory
INSERT INTO public.inventory (
  inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
)
VALUES
  ('Toyota', 'RAV4 XLE AWD', 2023, 'AWD | Sunroof, Blind Spot Monitor', '/images/vehicles/rav4.jpg', '/images/vehicles/rav4-tn.jpg', 30700, 14500, 'Blue', 2),
  ('Honda', 'CR-V EX-L', 2021, 'Leather Seats | Apple CarPlay | Backup Camera', '/images/vehicles/crv.jpg', '/images/vehicles/crv-tn.jpg', 28600, 19000, 'Silver', 2),
  ('Mazda', 'CX-5 Touring', 2022, 'AWD | Bose Premium Sound', '/images/vehicles/cx5.jpg', '/images/vehicles/cx5-tn.jpg', 29100, 21300, 'Red', 2),
  ('Nissan', 'Rogue SV', 2020, 'Navigation | Bluetooth', '/images/vehicles/rogue.jpg', '/images/vehicles/rogue-tn.jpg', 23800, 33000, 'White', 2),
  ('Hyundai', 'Tucson SEL', 2023, 'Remote Start | Lane Keeping Assist', '/images/vehicles/tucson.jpg', '/images/vehicles/tucson-tn.jpg', 27900, 12000, 'Gray', 2),
  ('Subaru', 'Forester Premium', 2021, 'AWD | Rear Cross Traffic Alert', '/images/vehicles/forester.jpg', '/images/vehicles/forester-tn.jpg', 25000, 24000, 'Green', 2),
  ('Chevrolet', 'Equinox LT', 2022, 'Touchscreen | Alloys', '/images/vehicles/equinox.jpg', '/images/vehicles/equinox-tn.jpg', 24700, 19800, 'Black', 2),
  ('Ford', 'Escape SE Hybrid', 2021, 'Hybrid Efficiency', '/images/vehicles/escape.jpg', '/images/vehicles/escape-tn.jpg', 26200, 17900, 'Gray', 2),
  ('Kia', 'Sportage EX', 2023, 'Panoramic Roof', '/images/vehicles/sportage.jpg', '/images/vehicles/sportage-tn.jpg', 28450, 9800, 'Silver', 2),
  ('Jeep', 'Cherokee Latitude', 2020, 'Trail Rated', '/images/vehicles/cherokee.jpg', '/images/vehicles/cherokee-tn.jpg', 22900, 22900, 'Black', 2);

-- Insert Truck inventory
INSERT INTO public.inventory (
  inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
)
VALUES
  ('Ford', 'F-150 XLT 4x4', 2023, 'SuperCrew | 5.0L V8 | Towing Package', '/images/vehicles/f150.jpg', '/images/vehicles/f150-tn.jpg', 42800, 15000, 'Blue', 3),
  ('Toyota', 'Tacoma TRD Sport', 2022, '4WD | Dual Climate', '/images/vehicles/tacoma.jpg', '/images/vehicles/tacoma-tn.jpg', 37500, 17000, 'Red', 3),
  ('Chevrolet', 'Silverado LTZ', 2021, 'Z71 Off-Road | Chrome Package', '/images/vehicles/silverado.jpg', '/images/vehicles/silverado-tn.jpg', 39200, 23000, 'Silver', 3),
  ('RAM', '1500 Big Horn', 2020, '5.7L HEMI | Touchscreen | Crew Cab', '/images/vehicles/ram1500.jpg', '/images/vehicles/ram1500-tn.jpg', 34700, 28000, 'Black', 3),
  ('Nissan', 'Frontier SV 4WD', 2022, 'Extended Cab | Rear Locking Diff', '/images/vehicles/frontier.jpg', '/images/vehicles/frontier-tn.jpg', 32600, 18000, 'Gray', 3),
  ('GMC', 'Sierra Elevation', 2023, 'Trailering Package | 10-Speed Auto', '/images/vehicles/sierra.jpg', '/images/vehicles/sierra-tn.jpg', 44100, 12000, 'White', 3),
  ('Ford', 'Ranger XLT FX4', 2021, 'Tonneau Cover | 4x4 | Hill Descent Control', '/images/vehicles/ranger.jpg', '/images/vehicles/ranger-tn.jpg', 31800, 20000, 'Blue', 3),
  ('Toyota', 'Tundra SR5', 2020, '5.7L V8 | Long Bed | Black Trim', '/images/vehicles/tundra.jpg', '/images/vehicles/tundra-tn.jpg', 36200, 25000, 'Silver', 3),
  ('Honda', 'Ridgeline RTL-E', 2022, 'AWD | Black Edition | Premium Audio', '/images/vehicles/ridgeline.jpg', '/images/vehicles/ridgeline-tn.jpg', 35400, 16000, 'Black', 3),
  ('Jeep', 'Gladiator Rubicon', 2023, 'Off-Road Ready | Fox Shocks | Removable Top', '/images/vehicles/gladiator.jpg', '/images/vehicles/gladiator-tn.jpg', 45900, 10000, 'Green', 3);