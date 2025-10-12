# 🎥 Comment Uploader Vos Propres Vidéos

## 🎯 Guide Pas à Pas

Vous avez un fichier vidéo (MP4, WebM) sur votre ordinateur et vous voulez l'afficher sur votre site ? Suivez ce guide !

---

## ⚡ Option 1 : Supabase Storage (Recommandé - Facile)

### Étape 1 : Préparer Votre Vidéo (5 min)

#### Format Recommandé
- **Format** : MP4 (H.264)
- **Résolution** : 1920×1080 (Full HD) ou 1280×720 (HD)
- **Durée** : 2-5 minutes idéalement
- **Taille** : Maximum 100 MB (pour Supabase gratuit)

#### Compresser Votre Vidéo (si trop grande)

**Option A : Avec HandBrake (Gratuit)**
1. Téléchargez HandBrake : https://handbrake.fr/
2. Ouvrez votre vidéo
3. Preset : "Fast 1080p30"
4. Format : MP4
5. Cliquez sur "Start Encode"

**Option B : En ligne avec CloudConvert**
1. Allez sur https://cloudconvert.com/mp4-converter
2. Uploadez votre vidéo
3. Sélectionnez : MP4, 1080p, qualité moyenne
4. Convertir et télécharger

---

### Étape 2 : Créer un Bucket Supabase (2 min)

1. **Ouvrez votre Dashboard Supabase**
   ```
   https://app.supabase.com → Votre projet
   ```

2. **Allez dans Storage**
   ```
   Menu de gauche → Storage (icône dossier)
   ```

3. **Créer un Bucket Public**
   ```
   Cliquez sur "New bucket"
   
   ┌────────────────────────────┐
   │ Name: vehicle-videos       │
   │ Public bucket: ✓ OUI      │
   │ File size limit: 100 MB    │
   └────────────────────────────┘
   
   [Create bucket]
   ```

   ⚠️ **Important** : Cochez "Public bucket" pour que les vidéos soient accessibles !

---

### Étape 3 : Uploader Votre Vidéo (1 min)

1. **Cliquez sur le bucket "vehicle-videos"**

2. **Upload File**
   ```
   [Upload file] ou glissez-déposez votre fichier
   ```

3. **Nommez votre fichier**
   ```
   Exemple : bmw-x7-exterior.mp4
   Format : marque-modele-type.mp4
   ```

4. **Upload !**
   - La barre de progression s'affiche
   - Attendez que ce soit terminé ✓

---

### Étape 4 : Récupérer l'URL de la Vidéo (30 sec)

1. **Cliquez sur votre vidéo dans la liste**

2. **Copiez l'URL publique**
   ```
   Cliquez sur [Copy URL]
   
   URL : https://xxx.supabase.co/storage/v1/object/public/vehicle-videos/bmw-x7-exterior.mp4
   ```

3. **Gardez cette URL** (vous en aurez besoin à l'étape suivante)

---

### Étape 5 : Ajouter la Vidéo dans la Base de Données (2 min)

#### Option A : Via l'Interface Supabase

1. **Table Editor** → `vehicle_videos` → **Insert row**

2. **Remplissez les champs** :
   ```
   ┌────────────────────────────────────────────────────────────┐
   │ vehicle_id:     [Copiez l'ID depuis table vehicles]       │
   │ video_url:      https://xxx.supabase.co/storage/...       │
   │ video_type:     direct                                     │
   │ title:          "BMW X7 - Tour Extérieur"                 │
   │ description:    "Présentation complète de l'extérieur"    │
   │ thumbnail_url:  (optionnel - on verra après)              │
   │ display_order:  1                                          │
   └────────────────────────────────────────────────────────────┘
   
   [Save]
   ```

#### Option B : Via SQL Editor

```sql
-- 1. Trouver l'ID du véhicule
SELECT id, name FROM vehicles WHERE name = 'BMW X7 M50i';

-- 2. Ajouter la vidéo
INSERT INTO vehicle_videos (
  vehicle_id, 
  video_url, 
  video_type, 
  title, 
  description, 
  display_order
)
VALUES (
  'uuid-du-vehicule-ici',
  'https://xxx.supabase.co/storage/v1/object/public/vehicle-videos/bmw-x7-exterior.mp4',
  'direct',
  'BMW X7 - Présentation Extérieure',
  'Découvrez tous les détails du design extérieur',
  1
);
```

---

### Étape 6 : Tester ! (30 sec)

1. **Lancez votre site**
   ```bash
   npm run dev
   ```

2. **Allez sur la page du véhicule**

3. **Scrollez jusqu'à "Vidéos"**

4. **Cliquez sur votre vidéo** → Elle se lit ! 🎉

---

## 📸 Bonus : Ajouter une Miniature (Thumbnail)

Pour que votre vidéo ait une jolie miniature au lieu d'un placeholder :

### Étape 1 : Créer une Capture d'Écran

1. **Ouvrez votre vidéo** dans VLC ou Windows Media Player
2. **Mettez en pause** sur une belle image
3. **Faites une capture** (Impr écran ou Outil Capture)
4. **Sauvegardez** : `bmw-x7-thumbnail.jpg`

### Étape 2 : Uploader la Miniature

1. **Supabase Storage** → bucket `vehicle-videos`
2. **Upload** `bmw-x7-thumbnail.jpg`
3. **Copiez l'URL** de la miniature

### Étape 3 : Mettre à Jour la Vidéo

```sql
UPDATE vehicle_videos
SET thumbnail_url = 'https://xxx.supabase.co/storage/v1/object/public/vehicle-videos/bmw-x7-thumbnail.jpg'
WHERE id = 'uuid-de-votre-video';
```

Ou via **Table Editor** → Éditez la ligne → Ajoutez l'URL dans `thumbnail_url`

---

## 💾 Option 2 : Cloudinary (Gratuit jusqu'à 25 GB)

### Avantages
- ✅ Optimisation automatique
- ✅ Streaming adaptatif
- ✅ CDN mondial rapide
- ✅ 25 GB gratuits

### Étapes

1. **Créez un compte** : https://cloudinary.com/users/register/free

2. **Upload Video**
   ```
   Media Library → Upload → Sélectionnez votre vidéo
   ```

3. **Récupérez l'URL**
   ```
   https://res.cloudinary.com/votre-compte/video/upload/v123456/video.mp4
   ```

4. **Ajoutez dans Supabase** comme à l'étape 5 ci-dessus

---

## 📊 Limites et Recommandations

### Supabase Storage (Plan Gratuit)
- **Stockage** : 1 GB total
- **Bande passante** : 2 GB/mois de téléchargement
- **Taille fichier** : 100 MB max par fichier

**Conseil** : Compressez vos vidéos pour rester dans les limites

### Cloudinary (Plan Gratuit)
- **Stockage** : 25 GB
- **Bande passante** : 25 GB/mois
- **Transformations** : 25 000/mois

**Conseil** : Idéal pour beaucoup de vidéos

---

## 🎬 Optimisation des Vidéos

### Avant Upload

#### Format Idéal
```
Format:       MP4 (H.264 + AAC)
Résolution:   1920×1080 (Full HD)
              ou 1280×720 (HD)
Bitrate:      2-4 Mbps (vidéo)
              128 kbps (audio)
FPS:          30 fps
Durée:        2-5 minutes
```

#### Outils de Compression

**HandBrake** (Gratuit - Recommandé)
```
1. Télécharger : https://handbrake.fr/
2. Ouvrir vidéo
3. Preset : "Fast 1080p30"
4. Quality : RF 22-24
5. Start Encode
```

**FFmpeg** (Ligne de commande)
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k output.mp4
```

**Adobe Media Encoder** (Payant mais puissant)
```
Format : H.264
Preset : YouTube 1080p
Bitrate : 8 Mbps
```

---

## 📱 Structure des Fichiers Recommandée

```
vehicle-videos/
├── bmw/
│   ├── bmw-x7-exterior.mp4
│   ├── bmw-x7-interior.mp4
│   ├── bmw-x7-drive.mp4
│   ├── bmw-x7-exterior-thumb.jpg
│   ├── bmw-x7-interior-thumb.jpg
│   └── bmw-x7-drive-thumb.jpg
├── lexus/
│   ├── lexus-lx-tour.mp4
│   └── lexus-lx-tour-thumb.jpg
└── ford/
    └── ford-f150-offroad.mp4
```

---

## 🔧 Dépannage

### Vidéo trop grande (> 100 MB)
**Solution** : Compresser avec HandBrake ou CloudConvert

### Vidéo ne se lit pas
**Vérifications** :
1. Format MP4 ? (pas AVI, MOV, etc.)
2. Bucket public ? (dans Supabase Storage)
3. URL correcte ? (testez dans navigateur)

### Vidéo lente à charger
**Solutions** :
1. Compresser davantage
2. Utiliser Cloudinary (CDN rapide)
3. Réduire la résolution (720p au lieu de 1080p)

### Pas de miniature
**Solution** : Créez et uploadez une image JPG, ajoutez l'URL dans `thumbnail_url`

---

## 📋 Checklist Complète

### Préparation
- [ ] Vidéo filmée ou récupérée
- [ ] Vidéo compressée (< 100 MB)
- [ ] Format MP4 (H.264)
- [ ] Miniature créée (JPG)

### Supabase
- [ ] Bucket "vehicle-videos" créé (public)
- [ ] Vidéo uploadée
- [ ] Miniature uploadée (optionnel)
- [ ] URLs copiées

### Base de Données
- [ ] ID du véhicule trouvé
- [ ] Ligne ajoutée dans `vehicle_videos`
- [ ] Type = "direct"
- [ ] Thumbnail_url rempli

### Test
- [ ] Site lancé (npm run dev)
- [ ] Page véhicule chargée
- [ ] Vidéo visible dans galerie
- [ ] Lecture fonctionne

---

## 🎯 Exemple Complet

### Votre Situation
```
Vous avez : bmw-x7-tour.mp4 (150 MB)
Véhicule : BMW X7 M50i
```

### Étapes
```
1. Compresser avec HandBrake → bmw-x7-tour.mp4 (45 MB)
2. Créer miniature → bmw-x7-tour-thumb.jpg
3. Supabase Storage → Upload les 2 fichiers
4. URLs obtenues :
   - Vidéo: https://xxx.supabase.co/.../bmw-x7-tour.mp4
   - Thumb: https://xxx.supabase.co/.../bmw-x7-tour-thumb.jpg
5. Table Editor → vehicle_videos → Insert :
   - video_url: [URL vidéo]
   - video_type: direct
   - thumbnail_url: [URL miniature]
   - title: "BMW X7 - Tour Complet"
6. Test → ✓ Ça marche !
```

---

## 💡 Conseils Pro

### Qualité vs Taille
- **1080p à 2 Mbps** : Bonne qualité, 15 MB/minute
- **720p à 1.5 Mbps** : Qualité correcte, 11 MB/minute
- **Vidéo de 3 min en 1080p** : ~45 MB ✅

### Organisation
- Nommez bien vos fichiers : `marque-modele-type.mp4`
- Gardez miniatures et vidéos ensemble
- Utilisez des dossiers par marque

### Performance
- Première vidéo : 720p (charge rapide)
- Vidéos suivantes : 1080p
- Total 3-5 vidéos max par véhicule

---

## 🎉 Vous êtes Prêt !

**Récap en 3 étapes** :

1. **Compresser** votre vidéo (HandBrake)
2. **Upload** sur Supabase Storage
3. **Ajouter** l'URL dans `vehicle_videos`

**Et c'est tout !** 🚀

---

**Questions ? Consultez le guide complet : VIDEOS-VEHICULES-GUIDE.md**

