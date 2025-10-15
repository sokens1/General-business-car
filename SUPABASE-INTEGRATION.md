# 📘 Guide d'Intégration Supabase - PRESTIGE car luxe

Ce guide vous accompagnera étape par étape pour intégrer Supabase à votre site PRESTIGE car luxe et le rendre entièrement dynamique.

---

## 🎯 Vue d'ensemble

Supabase fournira la base de données PostgreSQL pour stocker :
- Les véhicules disponibles
- Les demandes de contact
- Les services offerts
- Les rendez-vous clients
- Les témoignages

---

## ✅ Prérequis

- Node.js installé (version 16+)
- Un compte Supabase (gratuit) : [https://app.supabase.com](https://app.supabase.com)
- Accès au projet sur votre machine locale

---

## 📋 Étapes d'Intégration

### **Étape 1 : Créer un Projet Supabase**

1. Allez sur [https://app.supabase.com](https://app.supabase.com)
2. Connectez-vous ou créez un compte
3. Cliquez sur **"New Project"**
4. Remplissez les informations :
   - **Name** : `prestige-car-luxe` (ou le nom de votre choix)
   - **Database Password** : Choisissez un mot de passe fort (sauvegardez-le !)
   - **Region** : Choisissez une région proche (ex: `Europe West (Ireland)`)
   - **Pricing Plan** : Sélectionnez **Free** pour commencer
5. Cliquez sur **"Create new project"**
6. Attendez 2-3 minutes que le projet soit créé

---

### **Étape 2 : Récupérer les Clés API**

1. Dans votre dashboard Supabase, allez dans **Settings** (icône d'engrenage) > **API**
2. Vous verrez deux informations importantes :
   - **Project URL** : `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. **Copiez ces deux valeurs**, vous en aurez besoin à l'étape suivante

---

### **Étape 3 : Configurer les Variables d'Environnement**

1. Dans le dossier racine de votre projet, créez un fichier `.env` :

```bash
# À la racine du projet
touch .env
```

2. Ouvrez le fichier `.env` et ajoutez vos clés :

```env
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key-ici
```

⚠️ **Important** : Remplacez les valeurs par celles que vous avez copiées à l'étape 2

3. Assurez-vous que le fichier `.env` est dans votre `.gitignore` pour ne pas publier vos clés :

```bash
# Vérifiez que .gitignore contient :
.env
.env.local
```

---

### **Étape 4 : Exécuter le Schéma SQL**

1. Dans votre dashboard Supabase, allez dans **SQL Editor** (icône base de données)
2. Cliquez sur **"New Query"**
3. Ouvrez le fichier `supabase-schema.sql` qui se trouve à la racine de votre projet
4. **Copiez TOUT le contenu** du fichier
5. **Collez-le** dans l'éditeur SQL de Supabase
6. Cliquez sur **"Run"** (ou appuyez sur `Ctrl + Enter`)
7. Vous devriez voir un message de succès ✅

**Ce script va créer :**
- ✅ 5 tables (vehicles, contact_requests, services, appointments, testimonials)
- ✅ Tous les index pour optimiser les performances
- ✅ Les triggers pour mettre à jour automatiquement les timestamps
- ✅ Les politiques de sécurité RLS (Row Level Security)
- ✅ Des données d'exemple pour tester

---

### **Étape 5 : Vérifier les Tables**

1. Dans votre dashboard Supabase, allez dans **Table Editor** (icône tableau)
2. Vous devriez voir 5 tables :
   - `vehicles` - Les véhicules en stock
   - `contact_requests` - Les demandes de contact
   - `services` - Les services offerts
   - `appointments` - Les rendez-vous
   - `testimonials` - Les témoignages clients
3. Cliquez sur `vehicles` et vous devriez voir 4 véhicules d'exemple

---

### **Étape 6 : Tester l'Application**

1. Dans votre terminal, assurez-vous que les dépendances sont installées :

```bash
npm install
```

2. Démarrez le serveur de développement :

```bash
npm run dev
```

3. Ouvrez votre navigateur et allez sur `http://localhost:5173`

4. **Testez les fonctionnalités :**
   - ✅ La page d'accueil devrait afficher les véhicules en vedette
   - ✅ La page Stock devrait afficher tous les véhicules avec filtres
   - ✅ La page Services devrait afficher les services depuis Supabase
   - ✅ Le formulaire de contact devrait envoyer les données à Supabase

---

## 🎨 Configuration des Images

Les véhicules d'exemple utilisent des chemins d'images locaux. Pour un site en production, vous devez :

### **Option 1 : Storage Supabase (Recommandé)**

1. Dans Supabase, allez dans **Storage**
2. Créez un bucket public : `vehicle-images`
3. Uploadez vos images de véhicules
4. Mettez à jour les URLs dans la table `vehicles` :

```sql
UPDATE vehicles 
SET image_url = 'https://votre-project-id.supabase.co/storage/v1/object/public/vehicle-images/bmw-x7.jpg'
WHERE id = 'id-du-vehicule';
```

### **Option 2 : CDN Externe**

Utilisez un service comme Cloudinary, AWS S3, ou autre CDN pour héberger vos images.

---

## 📊 Gérer les Données

### **Ajouter un Véhicule**

Via l'interface Supabase :
1. Allez dans **Table Editor** > `vehicles`
2. Cliquez sur **"Insert row"**
3. Remplissez les champs
4. Cliquez sur **"Save"**

Ou via SQL :

```sql
INSERT INTO vehicles (name, make, model, year, price, currency, image_url, mileage, fuel_type, transmission, power, description, features, specs, is_featured, is_available)
VALUES (
  'Toyota Land Cruiser',
  'Toyota',
  'Land Cruiser',
  2024,
  45000000,
  'FCFA',
  '/path/to/image.jpg',
  0,
  'Diesel',
  'Automatique',
  '310 ch',
  'Le légendaire Toyota Land Cruiser...',
  ARRAY['4x4', 'Climatisation', '7 places'],
  '{"Moteur": "V6 3.3L Diesel", "Puissance": "310 ch"}'::jsonb,
  false,
  true
);
```

### **Consulter les Demandes de Contact**

```sql
SELECT * FROM contact_requests 
ORDER BY created_at DESC;
```

### **Mettre à Jour un Service**

```sql
UPDATE services 
SET description = 'Nouvelle description'
WHERE id = 'id-du-service';
```

---

## 🔒 Sécurité et Permissions

Les politiques RLS (Row Level Security) sont déjà configurées :

- **Lecture publique** : Les visiteurs peuvent voir les véhicules, services et témoignages approuvés
- **Écriture publique** : Les visiteurs peuvent créer des demandes de contact et rendez-vous
- **Administration** : Seuls les administrateurs authentifiés peuvent modifier les véhicules et services

### **Créer un Compte Admin**

Pour gérer le contenu, vous devez créer un compte admin :

1. Dans Supabase, allez dans **Authentication** > **Users**
2. Cliquez sur **"Add User"**
3. Entrez un email et mot de passe
4. Utilisez ces identifiants pour vous connecter au dashboard d'administration (à créer)

---

## 🚀 Déploiement en Production

### **1. Variables d'Environnement**

Sur votre plateforme de déploiement (Vercel, Netlify, etc.), ajoutez :

```
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

### **2. Build du Projet**

```bash
npm run build
```

### **3. Déployer**

Suivez les instructions de votre plateforme de déploiement.

---

## 📈 Monitoring et Analytics

### **Via Supabase Dashboard**

1. **Database** : Voir les requêtes lentes, l'utilisation
2. **API** : Voir le nombre de requêtes
3. **Storage** : Voir l'utilisation du stockage

### **Logs**

```sql
-- Voir les dernières demandes de contact
SELECT name, email, subject, created_at 
FROM contact_requests 
ORDER BY created_at DESC 
LIMIT 10;

-- Statistiques
SELECT 
  COUNT(*) as total_vehicles,
  AVG(price) as average_price
FROM vehicles 
WHERE is_available = true;
```

---

## 🆘 Résolution de Problèmes

### **Problème : Les véhicules ne s'affichent pas**

- ✅ Vérifiez que les variables d'environnement sont correctes dans `.env`
- ✅ Vérifiez que le schéma SQL a été exécuté sans erreurs
- ✅ Ouvrez la console du navigateur pour voir les erreurs
- ✅ Vérifiez que `is_available = true` dans la table vehicles

### **Problème : "Failed to fetch"**

- ✅ Vérifiez votre connexion internet
- ✅ Vérifiez que l'URL Supabase est correcte
- ✅ Vérifiez que les politiques RLS permettent la lecture publique

### **Problème : Le formulaire de contact ne fonctionne pas**

- ✅ Vérifiez la console du navigateur
- ✅ Vérifiez les politiques RLS de la table `contact_requests`
- ✅ Testez la requête directement dans le SQL Editor

---

## 📚 Ressources Utiles

- [Documentation Supabase](https://supabase.com/docs)
- [Guide PostgreSQL](https://www.postgresql.org/docs/)
- [React Query (TanStack Query)](https://tanstack.com/query/latest)
- [Documentation Supabase JS](https://supabase.com/docs/reference/javascript/introduction)

---

## 🎯 Prochaines Étapes

Pour améliorer encore le site :

1. **Dashboard Admin** : Créer une interface pour gérer les véhicules
2. **Recherche Avancée** : Ajouter une recherche full-text
3. **Notifications** : Envoyer des emails lors des demandes de contact
4. **Images Multiples** : Permettre plusieurs photos par véhicule
5. **Analytics** : Intégrer Google Analytics
6. **Newsletter** : Ajouter une table pour les abonnés newsletter

---

## ✨ Support

Si vous rencontrez des problèmes :

1. Consultez d'abord ce guide
2. Vérifiez la documentation Supabase
3. Regardez les logs dans la console
4. Contactez le support Supabase si nécessaire

---

**🎉 Félicitations ! Votre site PRESTIGE car luxe est maintenant dynamique et prêt à être utilisé !**

