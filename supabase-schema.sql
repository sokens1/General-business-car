-- ========================================
-- SCHÉMA DE BASE DE DONNÉES GÉNÉRAL BUSINESS CAR
-- À exécuter dans le SQL Editor de Supabase
-- ========================================

-- Activer l'extension UUID si nécessaire
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- TABLE: vehicles (Véhicules)
-- ========================================
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'FCFA',
  image_url TEXT NOT NULL,
  additional_images TEXT[], -- Tableau d'URLs d'images supplémentaires
  mileage INTEGER DEFAULT 0,
  fuel_type VARCHAR(50) NOT NULL, -- 'Essence', 'Diesel', 'Électrique', 'Hybride'
  transmission VARCHAR(50) DEFAULT 'Automatique',
  power VARCHAR(50),
  description TEXT,
  features TEXT[], -- Tableau des équipements
  specs JSONB, -- Caractéristiques techniques en JSON
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances de recherche
CREATE INDEX idx_vehicles_make ON vehicles(make);
CREATE INDEX idx_vehicles_fuel_type ON vehicles(fuel_type);
CREATE INDEX idx_vehicles_is_featured ON vehicles(is_featured);
CREATE INDEX idx_vehicles_is_available ON vehicles(is_available);
CREATE INDEX idx_vehicles_price ON vehicles(price);

-- ========================================
-- TABLE: contact_requests (Demandes de contact)
-- ========================================
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  request_type VARCHAR(50) DEFAULT 'contact', -- 'contact', 'test_drive', 'quote', 'financing'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_contact_requests_status ON contact_requests(status);
CREATE INDEX idx_contact_requests_vehicle_id ON contact_requests(vehicle_id);
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at DESC);

-- ========================================
-- TABLE: services (Services offerts)
-- ========================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  features TEXT[], -- Liste des caractéristiques du service
  icon VARCHAR(50), -- Nom de l'icône lucide-react
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_services_display_order ON services(display_order);
CREATE INDEX idx_services_is_active ON services(is_active);

-- ========================================
-- TABLE: appointments (Rendez-vous)
-- ========================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_preferred_date ON appointments(preferred_date);
CREATE INDEX idx_appointments_vehicle_id ON appointments(vehicle_id);

-- ========================================
-- TABLE: testimonials (Témoignages clients)
-- ========================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(255) NOT NULL,
  client_role VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_testimonials_is_approved ON testimonials(is_approved);
CREATE INDEX idx_testimonials_is_featured ON testimonials(is_featured);

-- ========================================
-- FONCTION: Mise à jour automatique de updated_at
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_requests_updated_at
  BEFORE UPDATE ON contact_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- DONNÉES D'EXEMPLE
-- ========================================

-- Insertion de véhicules d'exemple
INSERT INTO vehicles (name, make, model, year, price, currency, image_url, mileage, fuel_type, transmission, power, description, features, specs, is_featured, is_available) VALUES
(
  'BMW X7 M50i',
  'BMW',
  'X7 M50i',
  2024,
  55000000,
  'FCFA',
  '/src/assets/vehicle-1.jpg',
  0,
  'Essence',
  'Automatique',
  '530 ch',
  'Le BMW X7 M50i incarne le summum du luxe et de la performance. Ce SUV premium offre un espace généreux, des technologies de pointe et des performances exceptionnelles grâce à son moteur V8.',
  ARRAY['Toit panoramique', 'Sièges en cuir Nappa', 'Système audio Harman Kardon', 'Caméra 360°', 'Régulateur de vitesse adaptatif', 'Affichage tête haute', '7 places', 'Pack M Sport'],
  '{"Moteur": "V8 4.4L Twin-Turbo", "Puissance": "530 ch", "Couple": "750 Nm", "0-100 km/h": "4.7 secondes", "Vitesse max": "250 km/h (bridée)", "Consommation": "12.5 L/100km", "Émissions CO2": "285 g/km"}'::jsonb,
  true,
  true
),
(
  'Lexus LX 600',
  'Lexus',
  'LX 600',
  2024,
  65000000,
  'FCFA',
  '/src/assets/vehicle-2.jpg',
  0,
  'Essence',
  'Automatique',
  '409 ch',
  'Le Lexus LX 600 combine luxe raffiné et capacités tout-terrain exceptionnelles. Un SUV premium conçu pour les aventures les plus exigeantes.',
  ARRAY['Intérieur cuir premium', 'Système multimédia 12.3"', 'Suspension adaptative', 'Traction intégrale', 'Mode tout-terrain', 'Sièges ventilés', 'Hayon électrique'],
  '{"Moteur": "V6 3.5L Twin-Turbo", "Puissance": "409 ch", "Couple": "650 Nm", "0-100 km/h": "6.9 secondes", "Consommation": "13.0 L/100km"}'::jsonb,
  true,
  true
),
(
  'Ford F-150 Raptor',
  'Ford',
  'F-150 Raptor',
  2024,
  45000000,
  'FCFA',
  '/src/assets/vehicle-3.jpg',
  0,
  'Essence',
  'Automatique',
  '450 ch',
  'Le Ford F-150 Raptor est le pick-up ultime pour ceux qui recherchent puissance et capacités hors route exceptionnelles.',
  ARRAY['Suspension Fox Racing', 'Pneus tout-terrain BF Goodrich', 'Caméra 360°', 'Mode Baja', 'Intérieur sport', 'Système audio B&O'],
  '{"Moteur": "V6 3.5L EcoBoost", "Puissance": "450 ch", "Couple": "691 Nm", "0-100 km/h": "5.1 secondes", "Capacité de remorquage": "3,628 kg"}'::jsonb,
  true,
  true
),
(
  'Hyundai Ioniq 6',
  'Hyundai',
  'Ioniq 6',
  2024,
  32000000,
  'FCFA',
  '/src/assets/vehicle-4.jpg',
  0,
  'Électrique',
  'Automatique',
  '325 ch',
  'Le Hyundai Ioniq 6 est une berline électrique au design futuriste offrant une autonomie exceptionnelle et des technologies avancées.',
  ARRAY['Chargeur rapide 800V', 'Écrans dual 12"', 'Sièges relaxation', 'Pompe à chaleur', 'Vehicle-to-Load', 'Conduite autonome niveau 2'],
  '{"Moteur": "Dual Motor électrique", "Puissance": "325 ch", "Couple": "605 Nm", "0-100 km/h": "5.1 secondes", "Autonomie": "614 km", "Batterie": "77.4 kWh"}'::jsonb,
  true,
  true
);

-- Insertion de services d'exemple
INSERT INTO services (title, description, features, icon, display_order, is_active) VALUES
(
  'Entretien & Réparation',
  'Notre atelier équipé des dernières technologies et nos techniciens certifiés assurent l''entretien et la réparation de tous types de véhicules.',
  ARRAY['Révisions périodiques', 'Diagnostics électroniques', 'Réparations mécaniques', 'Pièces d''origine garanties'],
  'Wrench',
  1,
  true
),
(
  'Garantie Extended',
  'Protégez votre investissement avec nos programmes de garantie étendue adaptés à vos besoins.',
  ARRAY['Couverture complète', 'Assistance 24/7', 'Véhicule de remplacement', 'Extensions personnalisables'],
  'Shield',
  2,
  true
),
(
  'Prise de Rendez-vous',
  'Planifiez votre visite facilement en ligne ou par téléphone. Notre équipe s''adapte à votre emploi du temps.',
  ARRAY['Réservation en ligne', 'Rappels automatiques', 'Horaires flexibles', 'Service rapide'],
  'Calendar',
  3,
  true
),
(
  'Reprise & Échange',
  'Nous reprenons votre ancien véhicule au meilleur prix pour faciliter l''acquisition de votre nouveau véhicule.',
  ARRAY['Estimation gratuite', 'Évaluation professionnelle', 'Paiement immédiat', 'Formalités simplifiées'],
  'Car',
  4,
  true
);

-- ========================================
-- POLITIQUES DE SÉCURITÉ RLS (Row Level Security)
-- ========================================

-- Activer RLS sur toutes les tables
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Politique pour vehicles: Lecture publique, écriture admin seulement
CREATE POLICY "Lecture publique des véhicules disponibles" 
  ON vehicles FOR SELECT 
  USING (is_available = true);

-- Politique pour contact_requests: Insertion publique, lecture admin
CREATE POLICY "Insertion publique des demandes de contact" 
  ON contact_requests FOR INSERT 
  WITH CHECK (true);

-- Politique pour services: Lecture publique des services actifs
CREATE POLICY "Lecture publique des services actifs" 
  ON services FOR SELECT 
  USING (is_active = true);

-- Politique pour appointments: Insertion publique
CREATE POLICY "Insertion publique des rendez-vous" 
  ON appointments FOR INSERT 
  WITH CHECK (true);

-- Politique pour testimonials: Lecture publique des témoignages approuvés
CREATE POLICY "Lecture publique des témoignages approuvés" 
  ON testimonials FOR SELECT 
  USING (is_approved = true);

-- ========================================
-- VUES UTILES
-- ========================================

-- Vue pour les véhicules en vedette
CREATE OR REPLACE VIEW featured_vehicles AS
SELECT * FROM vehicles
WHERE is_featured = true AND is_available = true
ORDER BY created_at DESC;

-- Vue pour les statistiques
CREATE OR REPLACE VIEW site_statistics AS
SELECT 
  (SELECT COUNT(*) FROM vehicles WHERE is_available = true) as available_vehicles,
  (SELECT COUNT(*) FROM contact_requests WHERE status = 'pending') as pending_requests,
  (SELECT COUNT(*) FROM appointments WHERE status = 'pending') as pending_appointments,
  (SELECT COUNT(*) FROM testimonials WHERE is_approved = true) as approved_testimonials;

-- ========================================
-- COMMENTAIRES
-- ========================================

COMMENT ON TABLE vehicles IS 'Table contenant tous les véhicules en stock';
COMMENT ON TABLE contact_requests IS 'Table des demandes de contact, devis, essais';
COMMENT ON TABLE services IS 'Table des services offerts par le concessionnaire';
COMMENT ON TABLE appointments IS 'Table des rendez-vous clients';
COMMENT ON TABLE testimonials IS 'Table des témoignages clients';

