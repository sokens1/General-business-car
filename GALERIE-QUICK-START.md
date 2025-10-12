# ⚡ Galerie d'Images - Démarrage Rapide

## 🎯 Ce qui a été ajouté

Une **galerie d'images** pour chaque véhicule avec :
- 🖼️ Plusieurs photos par véhicule
- 👆 Navigation tactile et clics
- 📱 Responsive (desktop + mobile)
- ⚡ Défilement linéaire fluide

---

## 🚀 Configuration en 3 Étapes

### Étape 1 : Exécuter le SQL (2 min)

1. Ouvrez votre dashboard Supabase
2. Allez dans **SQL Editor** → **New Query**
3. Ouvrez le fichier `supabase-vehicle-images.sql`
4. **Copiez tout** le contenu
5. **Collez** dans l'éditeur SQL
6. Cliquez sur **"Run"** ▶️

✅ Cela crée :
- Table `vehicle_images`
- 12 images d'exemple (3 par véhicule)

---

### Étape 2 : Vérifier (30 sec)

1. Dans Supabase : **Table Editor** → `vehicle_images`
2. Vous devriez voir 12 lignes
3. Chaque véhicule a 3 images

---

### Étape 3 : Tester (30 sec)

1. Lancez votre application :
   ```bash
   npm run dev
   ```
2. Allez sur une page de détail de véhicule
3. Scrollez vers le bas
4. Vous devriez voir **"Galerie Photos"** avant "Équipements"

---

## 📸 Ajouter des Images pour un Véhicule

### Via Supabase (Interface)

1. **Table Editor** → `vehicle_images` → **Insert row**
2. Remplissez :
   - **vehicle_id** : Copiez l'ID depuis la table `vehicles`
   - **image_url** : URL de votre image
   - **alt_text** : Description (ex: "BMW X7 - Vue intérieure")
   - **display_order** : 1, 2, 3, etc.
3. **Save**

### Via SQL

```sql
-- Trouver l'ID du véhicule
SELECT id, name FROM vehicles WHERE name = 'Nom du véhicule';

-- Ajouter des images
INSERT INTO vehicle_images (vehicle_id, image_url, alt_text, display_order)
VALUES
  ('id-du-vehicule', '/images/photo1.jpg', 'Vue extérieure', 1),
  ('id-du-vehicule', '/images/photo2.jpg', 'Vue intérieure', 2),
  ('id-du-vehicule', '/images/photo3.jpg', 'Détail moteur', 3);
```

---

## 🖼️ Où Mettre les Images ?

### Option 1 : Supabase Storage (Recommandé)

1. **Storage** → Créer un bucket `vehicle-images` (public)
2. Uploadez vos images
3. Copiez l'URL publique :
   ```
   https://xxx.supabase.co/storage/v1/object/public/vehicle-images/photo.jpg
   ```

### Option 2 : CDN Externe

Cloudinary, AWS S3, etc.

### Option 3 : Fichiers Locaux (Dev)

```
/src/assets/ma-photo.jpg
```

---

## ✨ Fonctionnalités de la Galerie

### Desktop
- 🖱️ Clic sur les boutons ◀ ▶
- 🖼️ Clic sur les miniatures
- 🎯 Indicateur "1 / 3"

### Mobile
- 👆 Swipe gauche/droite
- 📜 Scroll horizontal sur les miniatures
- ⚡ Touch optimisé

### Comportement
- **0 images** : Pas de galerie (normal)
- **1 image** : Affiche l'image (pas de navigation)
- **2+ images** : Galerie complète avec navigation

---

## 📁 Fichiers Créés/Modifiés

### Nouveaux
```
✅ supabase-vehicle-images.sql          # Script SQL
✅ src/components/VehicleImageGallery.tsx  # Composant
✅ GALERIE-IMAGES-VEHICULES.md          # Guide complet
✅ GALERIE-QUICK-START.md               # Ce fichier
```

### Modifiés
```
📝 src/lib/supabase.ts                  # + Type VehicleImage
📝 src/hooks/useVehicles.ts             # + Fetch images
📝 src/pages/VehicleDetail.tsx          # + Intégration
```

---

## 🎨 Recommandations Images

| Critère | Recommandation |
|---------|----------------|
| **Format** | JPEG, WebP |
| **Dimensions** | 1200×800px ou 1920×1080px |
| **Poids** | Max 500KB |
| **Nommage** | `marque-modele-vue.jpg` |
| **Ordre** | Extérieur → Intérieur → Détails |

---

## 🔧 Problèmes ?

### La galerie ne s'affiche pas
```sql
-- Vérifier les images du véhicule
SELECT * FROM vehicle_images WHERE vehicle_id = 'votre-id';
```

### Les images ne chargent pas
- Vérifiez les URLs
- Console du navigateur (F12) pour voir les erreurs

---

## 📖 Documentation Complète

Pour plus de détails → **GALERIE-IMAGES-VEHICULES.md**

---

## ✅ C'est Fait !

Votre galerie est prête à l'emploi ! 🎉

Maintenant :
1. ✅ Uploadez vos vraies photos
2. ✅ Ajoutez-les dans la table `vehicle_images`
3. ✅ Profitez de la galerie interactive !

---

**📸 Bonne gestion de vos images ! 🚗**

