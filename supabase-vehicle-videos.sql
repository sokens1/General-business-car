-- ========================================
-- TABLE: vehicle_videos (Vidéos des véhicules)
-- À ajouter au schéma Supabase existant
-- ========================================

CREATE TABLE IF NOT EXISTS vehicle_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  video_type VARCHAR(50) NOT NULL, -- 'youtube', 'vimeo', 'direct'
  thumbnail_url TEXT,
  title VARCHAR(255),
  description TEXT,
  duration INTEGER, -- Durée en secondes
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_vehicle_videos_vehicle_id ON vehicle_videos(vehicle_id);
CREATE INDEX idx_vehicle_videos_display_order ON vehicle_videos(display_order);

-- Commentaire
COMMENT ON TABLE vehicle_videos IS 'Vidéos pour la galerie de chaque véhicule';

-- Politique de sécurité RLS
ALTER TABLE vehicle_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique des vidéos de véhicules" 
  ON vehicle_videos FOR SELECT 
  USING (true);

-- ========================================
-- DONNÉES D'EXEMPLE
-- ========================================

-- Vidéos pour BMW X7 M50i
INSERT INTO vehicle_videos (vehicle_id, video_url, video_type, title, description, display_order)
SELECT id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'BMW X7 - Présentation extérieure', 'Découvrez le design extérieur du BMW X7 M50i', 1
FROM vehicles WHERE name = 'BMW X7 M50i';

INSERT INTO vehicle_videos (vehicle_id, video_url, video_type, title, description, display_order)
SELECT id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'BMW X7 - Intérieur et technologies', 'Visite complète de l''habitacle luxueux', 2
FROM vehicles WHERE name = 'BMW X7 M50i';

-- Vidéos pour Lexus LX 600
INSERT INTO vehicle_videos (vehicle_id, video_url, video_type, title, description, display_order)
SELECT id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube', 'Lexus LX 600 - Test Drive', 'Essai sur route et tout-terrain', 1
FROM vehicles WHERE name = 'Lexus LX 600';

-- ========================================
-- FONCTIONS UTILES
-- ========================================

-- Fonction pour extraire l'ID YouTube depuis une URL
CREATE OR REPLACE FUNCTION extract_youtube_id(url TEXT)
RETURNS TEXT AS $$
BEGIN
  -- Format: https://www.youtube.com/watch?v=VIDEO_ID
  IF url LIKE '%youtube.com/watch?v=%' THEN
    RETURN substring(url from 'v=([^&]+)');
  -- Format: https://youtu.be/VIDEO_ID
  ELSIF url LIKE '%youtu.be/%' THEN
    RETURN substring(url from 'youtu.be/([^?]+)');
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour extraire l'ID Vimeo depuis une URL
CREATE OR REPLACE FUNCTION extract_vimeo_id(url TEXT)
RETURNS TEXT AS $$
BEGIN
  -- Format: https://vimeo.com/VIDEO_ID
  RETURN substring(url from 'vimeo.com/(\d+)');
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- EXEMPLES D'UTILISATION
-- ========================================

-- Ajouter une vidéo YouTube
-- INSERT INTO vehicle_videos (vehicle_id, video_url, video_type, title, description, display_order)
-- VALUES (
--   'uuid-du-vehicule',
--   'https://www.youtube.com/watch?v=VIDEO_ID',
--   'youtube',
--   'Titre de la vidéo',
--   'Description',
--   1
-- );

-- Ajouter une vidéo Vimeo
-- INSERT INTO vehicle_videos (vehicle_id, video_url, video_type, title, description, display_order)
-- VALUES (
--   'uuid-du-vehicule',
--   'https://vimeo.com/123456789',
--   'vimeo',
--   'Titre de la vidéo',
--   'Description',
--   2
-- );

-- Ajouter une vidéo hébergée directement
-- INSERT INTO vehicle_videos (vehicle_id, video_url, video_type, title, description, thumbnail_url, display_order)
-- VALUES (
--   'uuid-du-vehicule',
--   'https://votre-cdn.com/video.mp4',
--   'direct',
--   'Titre de la vidéo',
--   'Description',
--   'https://votre-cdn.com/thumbnail.jpg',
--   3
-- );

