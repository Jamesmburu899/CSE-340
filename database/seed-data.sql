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
  ('Toyota', 'Camry SE', 2023, '2.5L 4-Cylinder | Automatic | Rearview Camera, Lane Assist, Sport Trim', '/images/car1.jpg', '/images/car1.jpg', 26900, 12000, 'Silver', 1),
  ('Honda', 'Accord Sport', 2022, '1.5L Turbo | Touchscreen, Apple CarPlay, Premium Sound', '/images/car2.jpg', '/images/car2.jpg', 25400, 18400, 'Gray', 1),
  ('Nissan', 'Altima SV', 2021, 'AWD | ProPILOT Assist, Dual-Zone Climate Control', '/images/car3.jpg', '/images/car3.jpg', 23950, 22100, 'Charcoal Black', 1),
  ('Hyundai', 'Elantra SEL', 2020, 'Smartstream IVT, Backup Cam, Bluetooth', '/images/car4.jpg', '/images/car4.jpg', 18700, 30500, 'Red', 1),
  ('Mazda', '6 Touring', 2023, 'Heated Seats, Blind Spot Monitoring', '/images/car5.jpg', '/images/car5.jpg', 27200, 14300, 'Pearl White', 1),
  ('Kia', 'K5 LXS', 2021, '1.6L Turbo | Smart Cruise Control, Wireless Android Auto', '/images/car6.jpg', '/images/car6.jpg', 22300, 21000, 'Blue', 1),
  ('Volkswagen', 'Passat R-Line', 2020, 'Leather Interior | Heated Seats | Navigation', '/images/toyota.jpg', '/images/toyota.jpg', 20800, 25000, 'Black', 1),
  ('Lexus', 'ES 350', 2023, 'Luxury Package | Premium Audio | Panoramic Roof', '/images/sedan1.jpg', '/images/sedan1.jpg', 42500, 8000, 'Pearl White', 1),
  ('Audi', 'A4 Premium Plus', 2022, 'Quattro AWD | Virtual Cockpit | B&O Sound', '/images/sedan2.jpg', '/images/sedan2.jpg', 45800, 15000, 'Manhattan Gray', 1),
  ('BMW', '330i xDrive', 2023, 'M Sport Package | Navigation | Harman Kardon', '/images/sedan3.jpg', '/images/sedan3.jpg', 48200, 9500, 'Alpine White', 1),
  ('Mercedes-Benz', 'C300 4MATIC', 2022, 'Premium Package | Burmester Sound | LED Lighting', '/images/sedan4.jpg', '/images/sedan4.jpg', 49900, 12000, 'Obsidian Black', 1),
  ('Genesis', 'G70 3.3T', 2023, 'Sport Prestige | AWD | Nappa Leather', '/images/sedan5.jpg', '/images/sedan5.jpg', 51200, 7800, 'Siberian Ice', 1),
  ('Infiniti', 'Q50 Red Sport', 2022, '400hp Twin-Turbo V6 | Sport+ Mode | Dynamic Digital Suspension', '/images/sedan6.jpg', '/images/sedan6.jpg', 56700, 11000, 'Dynamic Sunstone Red', 1),
  ('Acura', 'TLX Type S', 2023, '355hp Turbo V6 | Super Handling AWD | ELS Studio Audio', '/images/sedan7.jpg', '/images/sedan7.jpg', 53900, 8900, 'Tiger Eye Pearl', 1),
  ('Volvo', 'S60 R-Design', 2022, 'T6 AWD | Pilot Assist | Bowers & Wilkins', '/images/car1.jpg', '/images/car1.jpg', 47800, 14500, 'Fusion Red', 1),
  ('Chrysler', '300S V8', 2022, 'HEMI V8 | BeatsAudio | Sport Mode', '/images/car2.jpg', '/images/car2.jpg', 41900, 16000, 'Granite Crystal', 1),
  ('Subaru', 'Legacy GT', 2023, 'Turbo Boxer Engine | Symmetrical AWD | StarLink Safety', '/images/car3.jpg', '/images/car3.jpg', 36800, 9800, 'Magnetite Gray', 1),
  ('Cadillac', 'CT5-V', 2023, 'Twin-Turbo V6 | Magnetic Ride Control | Super Cruise', '/images/car4.jpg', '/images/car4.jpg', 58900, 7500, 'Summit White', 1),
  ('Jaguar', 'XF R-Dynamic', 2022, '296hp I4 | Meridian Sound | Adaptive Dynamics', '/images/car5.jpg', '/images/car5.jpg', 55800, 12500, 'British Racing Green', 1),
  ('Alfa Romeo', 'Giulia Ti', 2023, 'Italian Design | Q4 AWD | Active Suspension', '/images/car6.jpg', '/images/car6.jpg', 49500, 8200, 'Rosso Red', 1);

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
  ('Kia', 'Sportage EX', 2023, 'Panoramic Roof', '/images/suv9.jpg', '/images/suv9.jpg', 28450, 9800, 'Silver', 2),
  ('Lexus', 'RX 350 F Sport', 2023, 'Luxury Package | Mark Levinson Audio | Panoramic View Monitor', '/images/suv1.jpg', '/images/suv1.jpg', 58900, 8500, 'Atomic Silver', 2),
  ('BMW', 'X5 xDrive40i', 2023, 'M Sport Package | Panoramic Sky Lounge | Harman Kardon', '/images/suv2.jpg', '/images/suv2.jpg', 65800, 9200, 'Carbon Black', 2),
  ('Mercedes-Benz', 'GLE 450 4MATIC', 2023, 'Premium Package | E-Active Body Control | Burmester Sound', '/images/suv3.jpg', '/images/suv3.jpg', 69900, 7800, 'Selenite Grey', 2),
  ('Audi', 'Q7 Prestige', 2023, 'S line Package | Bang & Olufsen 3D Sound | Air Suspension', '/images/suv4.jpg', '/images/suv4.jpg', 72500, 8100, 'Navarra Blue', 2),
  ('Porsche', 'Cayenne S', 2023, 'Sport Chrono Package | PASM | Premium Package Plus', '/images/suv5.jpg', '/images/suv5.jpg', 89900, 6500, 'Carrara White', 2),
  ('Acura', 'MDX Type S', 2023, 'Super Handling AWD | ELS STUDIO 3D | Sport Seats', '/images/suv6.jpg', '/images/suv6.jpg', 67800, 9800, 'Phantom Violet', 2),
  ('Infiniti', 'QX60 Autograph', 2023, 'Quilted Semi-aniline Leather | Motion Activated Liftgate | ProPILOT Assist', '/images/suv7.jpg', '/images/suv7.jpg', 65400, 8900, 'Warm Titanium', 2),
  ('Genesis', 'GV80 3.5T', 2023, 'Prestige Package | 3D Digital Cluster | Remote Smart Parking', '/images/suv8.jpg', '/images/suv8.jpg', 71900, 7200, 'Cardiff Green', 2),
  ('Volvo', 'XC90 Recharge', 2023, 'Plug-in Hybrid | Bowers & Wilkins | Air Suspension', '/images/suv9.jpg', '/images/suv9.jpg', 74500, 6800, 'Crystal White', 2),
  ('Land Rover', 'Range Rover Sport', 2023, 'Dynamic Package | Meridian Signature Sound | Terrain Response 2', '/images/suv1.jpg', '/images/suv1.jpg', 92800, 5900, 'Santorini Black', 2),
  ('Lincoln', 'Navigator Black Label', 2023, '30-Way Perfect Position Seats | Revel Ultima Audio | Active Motion', '/images/suv2.jpg', '/images/suv2.jpg', 98500, 6200, 'Chroma Crystal Blue', 2);

-- Insert Truck inventory
INSERT INTO public.inventory (
  inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
)
VALUES
  ('Ford', 'F-150 XLT 4x4', 2023, 'SuperCrew | 5.0L V8 | Towing Package', '/images/track1.jpg', '/images/track1.jpg', 42800, 15000, 'Blue', 3),
  ('Toyota', 'Tacoma TRD Sport', 2022, '4WD | Dual Climate', '/images/track2.jpg', '/images/track2.jpg', 37500, 17000, 'Red', 3),
  ('Chevrolet', 'Silverado LTZ', 2021, 'Z71 Off-Road | Chrome Package', '/images/Truck.jpg', '/images/Truck.jpg', 39200, 23000, 'Silver', 3),
  ('RAM', '1500 Limited', 2023, 'Crew Cab | 5.7L HEMI eTorque | Air Suspension', '/images/track1.jpg', '/images/track1.jpg', 62900, 8500, 'Diamond Black', 3),
  ('GMC', 'Sierra Denali Ultimate', 2023, 'CarbonPro Bed | Super Cruise | MultiPro Tailgate', '/images/track2.jpg', '/images/track2.jpg', 76500, 7200, 'Onyx Black', 3),
  ('Ford', 'F-150 Raptor', 2023, 'Twin-Turbo V6 | FOX Live Valve | 37-inch Tires', '/images/Truck.jpg', '/images/Truck.jpg', 78900, 6800, 'Code Orange', 3),
  ('Toyota', 'Tundra TRD Pro', 2023, 'i-FORCE MAX Hybrid | FOX Shocks | JBL Audio', '/images/track1.jpg', '/images/track1.jpg', 68500, 8900, 'Solar Octane', 3),
  ('Chevrolet', 'Silverado ZR2', 2023, 'Multimatic DSSV Shocks | Front/Rear Lockers | Skid Plates', '/images/track2.jpg', '/images/track2.jpg', 69900, 7500, 'Sand Dune', 3),
  ('RAM', '2500 Power Wagon', 2023, '6.4L HEMI V8 | 12,000-lb Winch | Bilstein Shocks', '/images/Truck.jpg', '/images/Truck.jpg', 71500, 6900, 'Flame Red', 3),
  ('Nissan', 'Titan PRO-4X', 2023, 'Endurance V8 | Off-Road Gauges | Around View Monitor', '/images/track1.jpg', '/images/track1.jpg', 52800, 9200, 'Deep Blue Pearl', 3),
  ('GMC', 'Canyon AT4X', 2023, 'Edition 1 | Multimatic Shocks | Front/Rear e-Lockers', '/images/track2.jpg', '/images/track2.jpg', 63500, 7800, 'Volcanic Red', 3),
  ('Ford', 'F-250 Tremor', 2023, '7.3L V8 | 35-inch Tires | Trail Control', '/images/Truck.jpg', '/images/Truck.jpg', 69800, 8100, 'Antimatter Blue', 3),
  ('Toyota', 'Tacoma TRD Pro', 2023, 'Crawl Control | Multi-Terrain Select | FOX Shocks', '/images/track1.jpg', '/images/track1.jpg', 49900, 8700, 'Lunar Rock', 3),
  ('Chevrolet', 'Colorado ZR2', 2023, 'Desert Boss Package | Multimatic DSSV | Rock Sliders', '/images/track2.jpg', '/images/track2.jpg', 48500, 8300, 'Radiant Red', 3),
  ('RAM', '1500 TRX', 2023, 'Supercharged 6.2L HEMI | Launch Control | Bilstein Blackhawk e2', '/images/Truck.jpg', '/images/Truck.jpg', 84900, 6500, 'Granite Crystal', 3),
  ('Jeep', 'Gladiator Rubicon', 2023, '3.6L V6 | Rock-Trac 4x4 | Front Trail Camera', '/images/track1.jpg', '/images/track1.jpg', 52700, 8900, 'Firecracker Red', 3),
  ('Honda', 'Ridgeline Black Edition', 2023, 'i-VTM4 AWD | In-Bed Trunk | Truck-Bed Audio', '/images/track2.jpg', '/images/track2.jpg', 46800, 9100, 'Crystal Black Pearl', 3),
  ('GMC', 'Sierra HD Denali', 2023, 'Duramax Diesel | ProGrade Trailering | Power Steps', '/images/Truck.jpg', '/images/Truck.jpg', 79500, 7400, 'White Frost', 3),
  ('Ford', 'F-150 Lightning', 2023, 'Extended Range Battery | Pro Power Onboard | BlueCruise', '/images/track1.jpg', '/images/track1.jpg', 85700, 5800, 'Atlas Blue', 3),
  ('Rivian', 'R1T Adventure', 2023, 'Quad-Motor AWD | Air Suspension | Gear Tunnel', '/images/track2.jpg', '/images/track2.jpg', 89900, 4900, 'Forest Green', 3);