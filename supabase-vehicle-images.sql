-- ========================================
-- TABLE: vehicle_images (Images supplémentaires des véhicules)
-- À ajouter au schéma Supabase existant
-- ========================================

CREATE TABLE IF NOT EXISTS vehicle_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_vehicle_images_vehicle_id ON vehicle_images(vehicle_id);
CREATE INDEX idx_vehicle_images_display_order ON vehicle_images(display_order);

-- Commentaire
COMMENT ON TABLE vehicle_images IS 'Images supplémentaires pour la galerie de chaque véhicule';

-- Politique de sécurité RLS
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique des images de véhicules" 
  ON vehicle_images FOR SELECT 
  USING (true);

-- ========================================
-- DONNÉES D'EXEMPLE
-- ========================================

-- Images pour BMW X7 M50i
INSERT INTO vehicle_images (vehicle_id, image_url, alt_text, display_order)
SELECT id, '/src/assets/vehicle-1.jpg', 'BMW X7 - Vue extérieure', 1
FROM vehicles WHERE name = 'BMW X7 M50i'
UNION ALL
SELECT id, '/src/assets/vehicle-2.jpg', 'BMW X7 - Vue intérieure', 2
FROM vehicles WHERE name = 'BMW X7 M50i'
UNION ALL
SELECT id, '/src/assets/vehicle-3.jpg', 'BMW X7 - Détail', 3
FROM vehicles WHERE name = 'BMW X7 M50i';

-- Images pour Lexus LX 600
INSERT INTO vehicle_images (vehicle_id, image_url, alt_text, display_order)
SELECT id, '/src/assets/vehicle-2.jpg', 'Lexus LX - Vue extérieure', 1
FROM vehicles WHERE name = 'Lexus LX 600'
UNION ALL
SELECT id, '/src/assets/vehicle-1.jpg', 'Lexus LX - Vue intérieure', 2
FROM vehicles WHERE name = 'Lexus LX 600'
UNION ALL
SELECT id, '/src/assets/vehicle-4.jpg', 'Lexus LX - Détail', 3
FROM vehicles WHERE name = 'Lexus LX 600';

-- Images pour Ford F-150 Raptor
INSERT INTO vehicle_images (vehicle_id, image_url, alt_text, display_order)
SELECT id, '/src/assets/vehicle-3.jpg', 'Ford F-150 - Vue extérieure', 1
FROM vehicles WHERE name = 'Ford F-150 Raptor'
UNION ALL
SELECT id, '/src/assets/vehicle-4.jpg', 'Ford F-150 - Vue intérieure', 2
FROM vehicles WHERE name = 'Ford F-150 Raptor'
UNION ALL
SELECT id, '/src/assets/vehicle-1.jpg', 'Ford F-150 - Détail', 3
FROM vehicles WHERE name = 'Ford F-150 Raptor';

-- Images pour Hyundai Ioniq 6
INSERT INTO vehicle_images (vehicle_id, image_url, alt_text, display_order)
SELECT id, '/src/assets/vehicle-4.jpg', 'Hyundai Ioniq 6 - Vue extérieure', 1
FROM vehicles WHERE name = 'Hyundai Ioniq 6'
UNION ALL
SELECT id, '/src/assets/vehicle-3.jpg', 'Hyundai Ioniq 6 - Vue intérieure', 2
FROM vehicles WHERE name = 'Hyundai Ioniq 6'
UNION ALL
SELECT id, '/src/assets/vehicle-2.jpg', 'Hyundai Ioniq 6 - Détail', 3
FROM vehicles WHERE name = 'Hyundai Ioniq 6';

