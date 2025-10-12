# ⚡ Guide de Démarrage Rapide - 5 Minutes

## 🎯 Vue d'Ensemble

Votre site Panafrique Motors est prêt ! Suivez ces 5 étapes simples pour le rendre dynamique avec Supabase.

---

## ✅ Checklist de Démarrage

### ☑️ Étape 1 : Créer un Compte Supabase (2 min)

1. Allez sur [https://app.supabase.com/sign-up](https://app.supabase.com/sign-up)
2. Inscrivez-vous avec GitHub ou Email
3. Cliquez sur **"New Project"**
4. Remplissez :
   - **Name** : `panafrique-motors`
   - **Password** : Choisissez un mot de passe fort 🔒
   - **Region** : `Europe West (Ireland)` ou le plus proche
   - **Plan** : Free (gratuit)
5. Cliquez sur **"Create new project"**
6. ⏳ Attendez 2-3 minutes...

---

### ☑️ Étape 2 : Récupérer les Clés API (1 min)

1. Dans votre projet Supabase, cliquez sur **Settings** ⚙️ (en bas à gauche)
2. Cliquez sur **API**
3. Copiez ces deux informations :

```
📌 Project URL:
https://xxxxxxxxxxxxx.supabase.co

📌 anon public key:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### ☑️ Étape 3 : Configurer le Projet (30 sec)

1. Ouvrez le projet dans votre éditeur de code
2. Créez un fichier `.env` à la racine :

**Windows (PowerShell)** :
```powershell
New-Item -Path .env -ItemType File
```

**Mac/Linux** :
```bash
touch .env
```

3. Ouvrez `.env` et collez :

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Remplacez** les valeurs par vos vraies clés !

---

### ☑️ Étape 4 : Créer la Base de Données (1 min)

1. Dans Supabase, cliquez sur **SQL Editor** 📊 (menu de gauche)
2. Cliquez sur **"New Query"**
3. Ouvrez le fichier `supabase-schema.sql` dans votre projet
4. **Sélectionnez TOUT** (`Ctrl+A` ou `Cmd+A`)
5. **Copiez** (`Ctrl+C` ou `Cmd+C`)
6. **Collez** dans l'éditeur SQL de Supabase
7. Cliquez sur **"Run"** ▶️ (ou `Ctrl+Enter`)
8. ✅ Vous devriez voir : "Success. No rows returned"

---

### ☑️ Étape 5 : Lancer l'Application (30 sec)

Dans votre terminal :

```bash
# Installer les dépendances (si pas déjà fait)
npm install

# Lancer le serveur de développement
npm run dev
```

🎉 **Ouvrez votre navigateur** : [http://localhost:5173](http://localhost:5173)

---

## ✨ Vérification

Votre site fonctionne si vous voyez :

- ✅ 4 véhicules sur la page d'accueil (BMW, Lexus, Ford, Hyundai)
- ✅ 6 véhicules sur la page Stock
- ✅ Les filtres fonctionnent (marque, carburant)
- ✅ Le formulaire de contact peut être envoyé

---

## 🔍 Vérifier les Données dans Supabase

1. Dans Supabase, cliquez sur **Table Editor** 📋
2. Cliquez sur `vehicles` → Vous devriez voir 4 véhicules
3. Cliquez sur `services` → Vous devriez voir 4 services
4. Testez le formulaire de contact sur votre site
5. Retournez dans Supabase → `contact_requests` → Vous devriez voir votre message !

---

## 🎨 Personnaliser les Données

### Ajouter un Véhicule

Dans Supabase :
1. **Table Editor** → `vehicles`
2. Cliquez sur **"Insert row"** ➕
3. Remplissez les champs :
   - **name** : "Toyota Land Cruiser"
   - **make** : "Toyota"
   - **model** : "Land Cruiser"
   - **year** : 2024
   - **price** : 45000000
   - **currency** : "FCFA"
   - **image_url** : URL de votre image
   - **mileage** : 0
   - **fuel_type** : "Diesel"
   - **transmission** : "Automatique"
   - **power** : "300 ch"
   - **description** : "Description du véhicule"
   - **features** : `{"4x4", "Climatisation", "GPS"}`
   - **specs** : `{"Moteur": "V6 3.0L"}`
   - **is_featured** : false
   - **is_available** : true
4. Cliquez sur **"Save"**
5. ✅ Rafraîchissez votre site → Le véhicule apparaît !

---

## 📱 Tester sur Mobile

```bash
# Obtenir votre IP locale
ipconfig  # Windows
ifconfig  # Mac/Linux

# Ouvrez sur votre téléphone :
http://192.168.x.x:5173
```

---

## 🚀 Prochaines Actions

### Prioritaires
- [ ] Uploader vos vraies images de véhicules
- [ ] Personnaliser les véhicules avec vos données
- [ ] Ajouter vos vrais numéros de téléphone
- [ ] Mettre à jour les prix en FCFA gabonais

### Recommandées
- [ ] Configurer Supabase Storage pour les images
- [ ] Créer un compte admin pour gérer le contenu
- [ ] Tester le formulaire de contact
- [ ] Personnaliser les couleurs du site

### Avancées
- [ ] Créer un dashboard admin
- [ ] Ajouter l'envoi d'emails automatiques
- [ ] Intégrer Google Analytics
- [ ] Optimiser les images

---

## 📚 Documentation Complète

Pour plus de détails, consultez :

- **[SUPABASE-INTEGRATION.md](./SUPABASE-INTEGRATION.md)** - Guide détaillé (20 min de lecture)
- **[RECAP-MODIFICATIONS.md](./RECAP-MODIFICATIONS.md)** - Récapitulatif complet
- **[README.md](./README.md)** - Documentation du projet

---

## 🆘 Problèmes Courants

### ❌ "Failed to fetch"
**Solution** : Vérifiez que vos clés dans `.env` sont correctes

### ❌ Les véhicules ne s'affichent pas
**Solution** : 
1. Vérifiez que le script SQL a bien été exécuté
2. Ouvrez la console du navigateur (F12) pour voir les erreurs

### ❌ Le formulaire ne s'envoie pas
**Solution** :
1. Vérifiez les politiques RLS dans Supabase
2. Consultez la console pour les erreurs

### ❌ "Module not found"
**Solution** :
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 Conseils Pro

### Images
- Utilisez des images optimisées (WebP, max 500KB)
- Dimensions recommandées : 800x600px
- Uploadez dans Supabase Storage pour de meilleures performances

### Performance
- Les données sont automatiquement mises en cache
- Rechargez la page pour voir les nouvelles données
- En production, le cache se rafraîchit automatiquement

### Sécurité
- ✅ Ne commitez JAMAIS le fichier `.env`
- ✅ Les clés API sont déjà protégées par RLS
- ✅ Seules les lectures publiques sont autorisées

---

## 📞 Besoin d'Aide ?

1. Consultez la documentation complète
2. Vérifiez la console du navigateur (F12)
3. Consultez les logs Supabase (Dashboard > Logs)
4. Documentation Supabase : [docs.supabase.com](https://docs.supabase.com)

---

## 🎉 Félicitations !

Votre site Panafrique Motors est maintenant :
- ✅ Localisé pour le Gabon
- ✅ Dynamique avec Supabase
- ✅ Prêt à être personnalisé
- ✅ Prêt pour la production

**Temps total : ~5 minutes** ⏱️

---

**🚀 Bon développement !**

