# 🎥 Guide des Vidéos de Véhicules

## ✨ Nouvelle Fonctionnalité : Vidéos dans la Galerie !

Vous pouvez maintenant ajouter des **vidéos** pour chaque véhicule en plus des photos !

---

## 🎯 Types de Vidéos Supportés

### 1. **YouTube** 📺 (Recommandé)
- Gratuit et facile
- Hébergement illimité
- Lecture fluide
- **URL** : `https://www.youtube.com/watch?v=VIDEO_ID`

### 2. **Vimeo** 🎬
- Qualité professionnelle
- Bon pour vidéos premium
- **URL** : `https://vimeo.com/VIDEO_ID`

### 3. **Vidéo Directe** 📹
- Fichier MP4/WebM hébergé
- Supabase Storage ou CDN
- **URL** : `https://votre-cdn.com/video.mp4`

---

## 🚀 Configuration (3 minutes)

### Étape 1 : Exécuter le SQL (1 min)

1. Ouvrez **Supabase** → **SQL Editor**
2. **New Query**
3. Copiez le contenu de `supabase-vehicle-videos.sql`
4. **Run** ▶️

✅ Cela crée :
- Table `vehicle_videos`
- 3 vidéos d'exemple

### Étape 2 : Vérifier (30 sec)

1. **Table Editor** → `vehicle_videos`
2. Vous devriez voir 3 vidéos

### Étape 3 : Tester (1 min)

```bash
npm run dev
```

Allez sur la page d'un véhicule → Vous verrez la section **"Vidéos (3)"** !

---

## 📹 Comment Ajouter une Vidéo

### Via Supabase (Interface)

```
Table Editor → vehicle_videos → Insert row

┌────────────────────────────────────────────┐
│ vehicle_id:   [ID du véhicule]            │
│ video_url:    https://youtube.com/watch?v= │
│ video_type:   youtube                      │
│ title:        "Présentation extérieure"    │
│ description:  "Découvrez le design..."     │
│ display_order: 1                           │
└────────────────────────────────────────────┘
[Save]
```

### Via SQL

#### Vidéo YouTube
```sql
-- 1. Trouver l'ID du véhicule
SELECT id, name FROM vehicles WHERE name = 'BMW X7 M50i';

-- 2. Ajouter la vidéo YouTube
INSERT INTO vehicle_videos (vehicle_id, video_url, video_type, title, description, display_order)
VALUES (
  'uuid-du-vehicule',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'youtube',
  'BMW X7 - Tour Complet',
  'Découvrez tous les détails du véhicule',
  1
);
```

#### Vidéo Vimeo
```sql
INSERT INTO vehicle_videos (vehicle_id, video_url, video_type, title, description, display_order)
VALUES (
  'uuid-du-vehicule',
  'https://vimeo.com/123456789',
  'vimeo',
  'Test Drive - BMW X7',
  'Essai sur route',
  2
);
```

#### Vidéo Directe (MP4)
```sql
INSERT INTO vehicle_videos (vehicle_id, video_url, video_type, title, thumbnail_url, display_order)
VALUES (
  'uuid-du-vehicule',
  'https://votre-cdn.com/bmw-x7-interior.mp4',
  'direct',
  'Intérieur - BMW X7',
  'https://votre-cdn.com/thumbnail.jpg',
  3
);
```

---

## 📊 Structure de la Table

```sql
vehicle_videos
├── id              UUID (PK)
├── vehicle_id      UUID (FK → vehicles.id)
├── video_url       TEXT
├── video_type      VARCHAR ('youtube', 'vimeo', 'direct')
├── thumbnail_url   TEXT (optionnel)
├── title           VARCHAR(255)
├── description     TEXT (optionnel)
├── duration        INTEGER (secondes, optionnel)
├── display_order   INTEGER
└── created_at      TIMESTAMP
```

---

## 🎨 Rendu sur le Site

### Vue Grille (Page Détail)
```
Vidéos (3)

┌─────────┬─────────┬─────────┐
│  ▶      │  ▶      │  ▶      │
│  Photo  │  Photo  │  Photo  │
│  Titre  │  Titre  │  Titre  │
└─────────┴─────────┴─────────┘
```

### Clic sur une Vidéo → Modal
```
┌──────────────────────────────┐
│                              │
│   [Vidéo YouTube/Vimeo]      │
│        Lecture auto          │
│                              │
├──────────────────────────────┤
│ Titre de la vidéo            │
│ Description...               │
└──────────────────────────────┘
```

---

## 🎬 Fonctionnalités

### Grille de Vidéos
- ✅ **Thumbnails** : Miniatures générées automatiquement (YouTube)
- ✅ **Icône Play** : Bouton de lecture visible
- ✅ **Titre** : Affiché en bas
- ✅ **Durée** : Si spécifiée (MM:SS)
- ✅ **Hover** : Zoom et effet de survol

### Modal de Lecture
- ✅ **Autoplay** : Lecture automatique au clic
- ✅ **Contrôles natifs** : Play, pause, volume
- ✅ **Plein écran** : Bouton fullscreen
- ✅ **Responsive** : Adapté mobile/desktop

### Support Vidéo
- ✅ **YouTube** : Embed player natif
- ✅ **Vimeo** : Player Vimeo
- ✅ **MP4/WebM** : Lecteur HTML5

---

## 💡 Recommandations

### Ordre d'Affichage Suggéré

1. **Présentation générale** (extérieur complet)
2. **Tour extérieur** (détails design)
3. **Visite intérieure** (habitacle)
4. **Technologies** (écran, fonctionnalités)
5. **Essai routier** (conduite)
6. **Moteur et performances**

### Titres Clairs

✅ Bon : "BMW X7 - Présentation Complète (2024)"  
❌ Mauvais : "Vidéo 1"

### Durée Idéale

- **Présentation** : 2-5 minutes
- **Test drive** : 5-10 minutes
- **Features** : 3-5 minutes
- **Total** : 3-5 vidéos maximum par véhicule

---

## 🎥 Où Héberger les Vidéos ?

### Option 1 : YouTube (⭐ Recommandé)

**Avantages** :
- ✅ Gratuit et illimité
- ✅ Excellent SEO
- ✅ Thumbnails automatiques
- ✅ Contrôles natifs
- ✅ Partage facile

**Comment faire** :
1. Créez une chaîne YouTube "Panafrique Motors"
2. Uploadez vos vidéos (publiques ou non répertoriées)
3. Copiez l'URL : `https://www.youtube.com/watch?v=VIDEO_ID`
4. Ajoutez dans Supabase avec `video_type = 'youtube'`

### Option 2 : Vimeo

**Avantages** :
- ✅ Qualité professionnelle
- ✅ Pas de publicité
- ✅ Personnalisable

**Inconvénients** :
- ❌ Limité en version gratuite (500MB/semaine)
- ❌ Payant pour plus d'espace

### Option 3 : Supabase Storage

**Pour vidéos courtes** (< 50MB) :
```
1. Storage → Créer bucket "vehicle-videos"
2. Uploader video.mp4
3. URL : https://xxx.supabase.co/storage/v1/object/public/vehicle-videos/video.mp4
4. Type : 'direct'
```

---

## 📱 Responsive

| Appareil | Layout |
|----------|--------|
| 📱 **Mobile** | 1 colonne |
| 📱 **Tablet** | 2 colonnes |
| 💻 **Desktop** | 3 colonnes |

---

## 🎯 Exemples d'URLs

### YouTube
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
```

### Vimeo
```
https://vimeo.com/123456789
```

### Direct
```
https://cdn.example.com/videos/bmw-x7.mp4
https://xxx.supabase.co/storage/v1/object/public/videos/car.mp4
```

---

## 🔧 Gestion des Vidéos

### Voir les vidéos d'un véhicule
```sql
SELECT * FROM vehicle_videos
WHERE vehicle_id = 'uuid-du-vehicule'
ORDER BY display_order;
```

### Modifier l'ordre
```sql
UPDATE vehicle_videos
SET display_order = 1
WHERE id = 'uuid-de-la-video';
```

### Supprimer une vidéo
```sql
DELETE FROM vehicle_videos
WHERE id = 'uuid-de-la-video';
```

### Changer le titre
```sql
UPDATE vehicle_videos
SET title = 'Nouveau titre',
    description = 'Nouvelle description'
WHERE id = 'uuid-de-la-video';
```

---

## ✅ Checklist

- [ ] Exécuter `supabase-vehicle-videos.sql`
- [ ] Vérifier la table créée
- [ ] Tester avec les vidéos d'exemple
- [ ] Créer votre chaîne YouTube
- [ ] Uploader vos vidéos
- [ ] Ajouter les URLs dans Supabase
- [ ] Tester sur mobile
- [ ] Vérifier la lecture

---

## 🎊 Résultat Final

Vos pages de véhicules auront :

```
📸 Galerie Photos (4)
[Images en grille]

🎥 Vidéos (3)
[Vidéos avec play button]

🔧 Équipements
⚙️ Caractéristiques
```

---

## 💬 Questions Fréquentes

**Q : Les vidéos se chargent-elles automatiquement ?**  
R : Non, elles se chargent au clic (économise la bande passante)

**Q : Combien de vidéos par véhicule ?**  
R : Autant que vous voulez, mais 3-5 c'est idéal

**Q : Dois-je uploader les vidéos sur mon serveur ?**  
R : Non, utilisez YouTube (gratuit et recommandé)

**Q : Les vidéos marchent sur mobile ?**  
R : Oui, parfaitement responsive !

---

**🎬 Profitez de vos vidéos ! 🚗**

