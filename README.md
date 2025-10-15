# 🚗 PRESTIGE car luxe - Site Web

## 📍 Localisation

**Pays** : Gabon 🇬🇦  
**Ville** : Libreville  
**Secteur** : Vente de véhicules premium et services automobiles

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 16+ et npm installés
- Un compte Supabase (gratuit) : [https://app.supabase.com](https://app.supabase.com)

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer Supabase (voir SUPABASE-INTEGRATION.md)
# Créer un fichier .env avec vos clés Supabase

# 3. Démarrer le serveur de développement
npm run dev

# 4. Ouvrir http://localhost:5173 dans votre navigateur
```

## 📚 Documentation

### Guides Principaux
- **[SUPABASE-INTEGRATION.md](./SUPABASE-INTEGRATION.md)** - Guide complet d'intégration Supabase (étapes détaillées)
- **[RECAP-MODIFICATIONS.md](./RECAP-MODIFICATIONS.md)** - Récapitulatif de toutes les modifications
- **[supabase-schema.sql](./supabase-schema.sql)** - Schéma SQL à exécuter dans Supabase

### Galerie d'Images (NEW! 📸)
- **[GALERIE-QUICK-START.md](./GALERIE-QUICK-START.md)** - Démarrage rapide galerie (3 min)
- **[GALERIE-IMAGES-VEHICULES.md](./GALERIE-IMAGES-VEHICULES.md)** - Guide complet galerie
- **[supabase-vehicle-images.sql](./supabase-vehicle-images.sql)** - Script SQL pour les images

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Framework JavaScript
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **Tailwind CSS** - Styling
- **shadcn/ui** - Composants UI
- **React Router** - Navigation
- **Lucide React** - Icônes

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL - Base de données
  - Authentication - Gestion des utilisateurs
  - Storage - Stockage de fichiers
  - Row Level Security - Sécurité

### State Management
- **TanStack Query (React Query)** - Gestion des requêtes et cache

## ✨ Fonctionnalités

### 🏠 Page d'Accueil
- Section hero avec slider
- Véhicules en vedette (dynamiques depuis Supabase)
- Offres spéciales
- Section "Pourquoi nous choisir"

### 🚘 Stock de Véhicules
- Liste complète des véhicules disponibles
- Filtres par marque et type de carburant
- Affichage avec images et détails
- Page de détail pour chaque véhicule
- **Galerie d'images interactive** avec navigation (NEW! 📸)

### 🛠️ Services
- Liste des services offerts
- Services chargés depuis Supabase
- Icônes et descriptions

### 📞 Contact
- Formulaire de contact connecté à Supabase
- Informations de contact (Gabon)
- Carte interactive (à venir)

### ℹ️ À Propos
- Histoire de l'entreprise
- Valeurs et mission
- Statistiques
- Présentation de l'équipe

## 📊 Structure du Projet

```
prestige-car-luxe/
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── ui/          # Composants UI (shadcn)
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/           # Pages de l'application
│   │   ├── Index.tsx    # Page d'accueil
│   │   ├── Stock.tsx    # Page véhicules
│   │   ├── Contact.tsx  # Page contact
│   │   └── ...
│   ├── hooks/           # Hooks personnalisés
│   │   ├── useVehicles.ts
│   │   ├── useServices.ts
│   │   └── ...
│   ├── lib/             # Utilitaires
│   │   └── supabase.ts  # Client Supabase
│   └── assets/          # Images et ressources
├── public/              # Fichiers statiques
│   └── favicon.svg      # Favicon personnalisé
├── supabase-schema.sql  # Schéma de base de données
├── SUPABASE-INTEGRATION.md  # Guide d'intégration
└── RECAP-MODIFICATIONS.md   # Récapitulatif
```

## 🚀 Déploiement

### Variables d'Environnement

Assurez-vous de configurer ces variables sur votre plateforme de déploiement :

```env
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

### Build

```bash
npm run build
```

Le dossier `dist/` contiendra les fichiers prêts pour la production.

### Plateformes Recommandées

- **Vercel** - Déploiement facile pour Vite/React
- **Netlify** - Alternative avec CI/CD
- **Cloudflare Pages** - Performance optimale
