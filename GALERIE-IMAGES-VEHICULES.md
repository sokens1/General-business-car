# 📸 Guide de la Galerie d'Images des Véhicules

## ✨ Vue d'Ensemble

Une nouvelle fonctionnalité a été ajoutée : **Galerie d'Images pour les Véhicules**.

Chaque véhicule peut maintenant avoir plusieurs photos supplémentaires qui s'affichent dans une galerie interactive avec :
- 🖼️ Défilement linéaire des images
- 👆 Navigation tactile (mobile-friendly)
- 🎯 Miniatures cliquables
- ⚡ Transitions fluides
- 📱 Responsive sur tous les appareils

---

## 🗄️ Structure de la Base de Données

### Nouvelle Table : `vehicle_images`

```sql
CREATE TABLE vehicle_images (
  id UUID PRIMARY KEY,
  vehicle_id UUID NOT NULL,     -- Référence au véhicule
  image_url TEXT NOT NULL,       -- URL de l'image
  alt_text VARCHAR(255),         -- Texte alternatif
  display_order INTEGER,         -- Ordre d'affichage
  created_at TIMESTAMP
);
```

### Relations
- Une image appartient à **un seul véhicule**
- Un véhicule peut avoir **plusieurs images**

---

## 🚀 Configuration dans Supabase

### Étape 1 : Exécuter le Script SQL

1. Ouvrez votre dashboard Supabase
2. Allez dans **SQL Editor**
3. Créez une nouvelle requête
4. Copiez le contenu du fichier `supabase-vehicle-images.sql`
5. Cliquez sur **Run**

Le script va créer :
- ✅ La table `vehicle_images`
- ✅ Les index pour performances
- ✅ Les politiques RLS (sécurité)
- ✅ Des données d'exemple (3 images par véhicule)

### Étape 2 : Vérifier les Données

1. Allez dans **Table Editor**
2. Cliquez sur `vehicle_images`
3. Vous devriez voir 12 images (3 par véhicule × 4 véhicules)

---

## 📁 Fichiers Modifiés/Créés

### Nouveaux Fichiers

```
📁 Nouveau
├── supabase-vehicle-images.sql          # Script SQL
├── src/components/VehicleImageGallery.tsx  # Composant galerie
└── GALERIE-IMAGES-VEHICULES.md          # Ce guide
```

### Fichiers Modifiés

```
📝 Modifiés
├── src/lib/supabase.ts                  # + Type VehicleImage
├── src/hooks/useVehicles.ts             # + Récupération images
└── src/pages/VehicleDetail.tsx          # + Intégration galerie
```

---

## 🎨 Fonctionnalités de la Galerie

### Navigation
- **Boutons Précédent/Suivant** : Apparaissent au survol (desktop)
- **Swipe** : Balayage tactile (mobile)
- **Miniatures** : Clic pour afficher une image spécifique

### Design
- **Image principale** : Grande image en 16:9
- **Indicateur** : "1 / 3" en bas au centre
- **Miniatures** : Rangée de 3-4 images en bas
- **Active** : Bordure dorée sur la miniature sélectionnée
- **Hover** : Zoom léger sur l'image principale

### Responsive
- **Desktop** : Galerie complète avec toutes les fonctionnalités
- **Tablet** : Navigation tactile + miniatures
- **Mobile** : Optimisé pour le touch, miniatures scrollables

---

## 📊 Comment Ajouter des Images à un Véhicule

### Méthode 1 : Via l'interface Supabase

1. **Table Editor** → `vehicle_images`
2. Cliquez sur **"Insert row"**
3. Remplissez les champs :

| Champ | Description | Exemple |
|-------|-------------|---------|
| **vehicle_id** | ID du véhicule (depuis la table `vehicles`) | `uuid-du-vehicule` |
| **image_url** | URL de l'image | `/src/assets/bmw-interior.jpg` |
| **alt_text** | Description | "BMW X7 - Intérieur luxueux" |
| **display_order** | Ordre d'affichage (1, 2, 3...) | `1` |

4. Cliquez sur **"Save"**

### Méthode 2 : Via SQL

```sql
INSERT INTO vehicle_images (vehicle_id, image_url, alt_text, display_order)
VALUES (
  'id-du-vehicule-ici',
  '/path/to/image.jpg',
  'Description de l''image',
  1
);
```

### Exemple complet pour un véhicule :

```sql
-- Récupérer l'ID du véhicule
SELECT id, name FROM vehicles WHERE name = 'BMW X7 M50i';

-- Ajouter 3 images pour ce véhicule
INSERT INTO vehicle_images (vehicle_id, image_url, alt_text, display_order)
VALUES
  ('uuid-du-vehicule', '/images/bmw-x7-exterior.jpg', 'Vue extérieure', 1),
  ('uuid-du-vehicule', '/images/bmw-x7-interior.jpg', 'Vue intérieure', 2),
  ('uuid-du-vehicule', '/images/bmw-x7-engine.jpg', 'Moteur V8', 3);
```

---

## 🖼️ Gestion des Images

### Où Stocker les Images ?

#### Option 1 : Supabase Storage (Recommandé)

1. Dans Supabase, allez dans **Storage**
2. Créez un bucket public : `vehicle-images`
3. Uploadez vos images
4. Récupérez l'URL publique :
   ```
   https://votre-project.supabase.co/storage/v1/object/public/vehicle-images/bmw-x7.jpg
   ```
5. Utilisez cette URL dans la table `vehicle_images`

**Avantages** :
- ✅ Images hébergées avec le reste de vos données
- ✅ URLs stables
- ✅ CDN intégré
- ✅ Gratuit jusqu'à 1GB

#### Option 2 : CDN Externe

Utilisez Cloudinary, AWS S3, ou autre service :
```
https://res.cloudinary.com/your-account/image/upload/bmw-x7.jpg
```

#### Option 3 : Chemin Local (Développement)

Pour le développement :
```
/src/assets/vehicle-1.jpg
```

---

## 📝 Exemples d'Utilisation

### Ajouter des Images pour un Nouveau Véhicule

```sql
-- 1. Créer le véhicule
INSERT INTO vehicles (name, make, model, year, price, currency, image_url, ...)
VALUES ('Mercedes GLE', 'Mercedes', 'GLE', 2024, 50000000, 'FCFA', '/images/gle-main.jpg', ...)
RETURNING id;

-- 2. Ajouter les images (utilisez l'ID retourné)
INSERT INTO vehicle_images (vehicle_id, image_url, alt_text, display_order)
VALUES
  ('id-du-vehicule', '/images/gle-front.jpg', 'Vue avant', 1),
  ('id-du-vehicule', '/images/gle-side.jpg', 'Vue de profil', 2),
  ('id-du-vehicule', '/images/gle-back.jpg', 'Vue arrière', 3),
  ('id-du-vehicule', '/images/gle-interior.jpg', 'Intérieur', 4),
  ('id-du-vehicule', '/images/gle-dashboard.jpg', 'Tableau de bord', 5);
```

### Modifier l'Ordre des Images

```sql
UPDATE vehicle_images
SET display_order = 1
WHERE id = 'id-de-limage-a-mettre-en-premier';

UPDATE vehicle_images
SET display_order = 2
WHERE id = 'id-de-la-deuxieme-image';
```

### Supprimer une Image

```sql
DELETE FROM vehicle_images
WHERE id = 'id-de-limage';
```

### Voir les Images d'un Véhicule

```sql
SELECT * FROM vehicle_images
WHERE vehicle_id = 'id-du-vehicule'
ORDER BY display_order;
```

---

## 🎯 Comportement de la Galerie

### Si un véhicule a 0 images
- La galerie ne s'affiche pas
- Pas d'erreur, juste pas de section galerie

### Si un véhicule a 1 image
- L'image s'affiche
- Pas de navigation (inutile)
- Pas de miniatures

### Si un véhicule a 2+ images
- Galerie complète
- Navigation précédent/suivant
- Miniatures scrollables
- Indicateur de position

---

## 💡 Bonnes Pratiques

### Images

- **Format** : JPEG ou WebP pour les photos
- **Taille** : 1200×800px (ratio 3:2) ou 1920×1080px (16:9)
- **Poids** : Max 500KB par image (optimisez avec TinyPNG)
- **Nommage** : `marque-modele-vue.jpg` (ex: `bmw-x7-interior.jpg`)

### Ordre d'Affichage

1. Vue extérieure principale
2. Vue de profil
3. Vue arrière
4. Intérieur avant
5. Tableau de bord
6. Sièges arrière
7. Coffre
8. Moteur
9. Détails (volant, console, etc.)

### Texte Alternatif

- Descriptif et précis
- Utile pour le SEO et l'accessibilité
- Format : "Marque Modèle - Description"
- Exemple : "BMW X7 M50i - Intérieur cuir Nappa beige"

---

## 🔧 Dépannage

### La galerie ne s'affiche pas

**Vérifiez :**
1. Le véhicule a-t-il des images dans la table `vehicle_images` ?
   ```sql
   SELECT * FROM vehicle_images WHERE vehicle_id = 'votre-id';
   ```
2. Les URLs des images sont-elles valides ?
3. Ouvrez la console du navigateur (F12) pour voir les erreurs

### Les images ne se chargent pas

**Solutions :**
- Vérifiez les URLs dans la table
- Si vous utilisez Supabase Storage, vérifiez que le bucket est public
- Vérifiez les CORS si les images sont sur un autre domaine

### L'ordre des images est incorrect

```sql
-- Réorganiser les images
UPDATE vehicle_images SET display_order = 1 WHERE id = 'premiere-image';
UPDATE vehicle_images SET display_order = 2 WHERE id = 'deuxieme-image';
-- etc.
```

---

## 📊 Statistiques

### Données d'Exemple Créées

- **4 véhicules** avec galerie
- **3 images** par véhicule
- **12 images** au total

### Capacité

- **Supabase Free** : 1GB de stockage
- **Images** : ~500KB chacune
- **Capacité** : ~2000 images environ

---

## 🚀 Amélioration Future

Vous pourriez ajouter :

1. **Zoom d'image** : Clic pour agrandir
2. **Lightbox** : Vue plein écran
3. **Upload direct** : Interface admin pour uploader
4. **Catégories** : Extérieur, Intérieur, Détails
5. **Vidéos** : Support des vidéos en plus des images
6. **Lazy loading** : Charger les images à la demande

---

## 📚 Documentation Technique

### Type TypeScript

```typescript
export type VehicleImage = {
  id: string;
  vehicle_id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  created_at: string;
};
```

### Composant

```tsx
<VehicleImageGallery 
  images={vehicle.vehicle_images} 
  vehicleName={vehicle.name}
/>
```

### Hook

```typescript
const { data: vehicle } = useVehicle(id);
// vehicle.vehicle_images contient les images
```

---

## ✅ Checklist de Configuration

- [ ] Exécuter `supabase-vehicle-images.sql` dans Supabase
- [ ] Vérifier que la table est créée
- [ ] Vérifier les données d'exemple (12 images)
- [ ] Tester sur la page de détail d'un véhicule
- [ ] Uploader vos vraies images
- [ ] Mettre à jour les URLs dans la table
- [ ] Tester sur mobile
- [ ] Vérifier la navigation

---

## 🎉 Résultat Final

Une fois configuré, vos pages de détail de véhicules auront :

✅ **Image principale** en haut  
✅ **Galerie d'images** sous la description  
✅ **Navigation fluide** entre les images  
✅ **Miniatures cliquables**  
✅ **Design moderne** et responsive  
✅ **Optimisé mobile** avec touch/swipe  

---

**📸 Profitez de votre nouvelle galerie d'images ! 🚗**

