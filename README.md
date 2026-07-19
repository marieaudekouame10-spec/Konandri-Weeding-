# 🎊 Wedding Companion - Yoane & Marie-Aude

> Site compagnon de mariage interactif, élégant et moderne pour le mariage traditionnel ivoirien de Yoane & Marie-Aude à Menara Garden (08 août 2026).

---

## 🎯 Concept

Ce site n'est **pas** le site d'invitation. C'est une **expérience digitale destinée aux invités** avant, pendant et après le mariage.

### Objectif
Créer un petit **guide interactif de mariage**, élégant, personnalisé et facile à utiliser sur smartphone.

### Thème
**Tropical Sunset** - Jardin tropical élégant, cérémonie en plein air, lumière dorée, tradition ivoirienne chic.

---

## ✨ Fonctionnalités principales

### 1. **🪑 Trouver ma place**
L'invité recherche son nom dans la base de données Google Sheets et voit :
- Son numéro de table et le nom de sa table (ex: Table 1 - Coral)
- Ses co-convives à la même table
- Un plan interactif du jardin avec mise en évidence de sa table

**Recherche intelligente :**
- Fuzzy search (correction de fautes)
- Gestion des accents
- Ordre prénom/nom inversé
- Autocomplétion avec suggestions

### 2. **🍽️ Découvrir les saveurs**
Rubrique immersive présentant les plats ivoiriens et les boissons de la réception.
- Entrées, plats traditionnels, douceurs, boissons
- Cartes interactives avec descriptions poétiques
- Pas de présentation "menu de restaurant"

### 3. **🎁 Informations cadeaux**
Rubrique courte et discrète.
- Privilégier les cadeaux en espèces
- Pas de QR code, Wave, Orange Money, ou coordonnées bancaires
- Ton authentique et humble

### 4. **📸 Partager mes photos**
Galerie collaborative où les invités partagent leurs photos.
- Upload simple depuis smartphone
- Compression automatique
- Affichage en mosaïque moderne
- Compteur dynamique (nombre de photos, participants)

### 5. **💌 Livre d'or**
Espace pour laisser des messages de félicitations.
- Formulaire simple (Prénom, Message)
- Caractères limités (300 max)
- Cartes élégantes
- Modération administrateur

### 6. **⚙️ Espace administrateur**
Tableau de bord sécurisé pour gérer :
- Les invités
- Le placement
- Les photos
- Les messages du livre d'or
- Le contenu du site

---

## 📊 Données réelles

### Google Sheets (source unique)
**ID:** `1oNFzsq3Wuqyej18k0K73bysJMaYZIoLrYYB1dcOACGU`

**Structure :**

| Nom & Prénom | Accompagnateur(trice) | Table | Nom Table |
|---|---|---|---|
| Assagou Josaphat Sosthene | - | Table 1 | Coral |
| Koné Ismaël | - | Table 1 | - |
| DIBY Ulrich | DIGBA Marie-France | Table 2 | Blush |

**Tables (6 au total) :**
- Table 1 - Coral (#FF7F50)
- Table 2 - Blush (#FFB6C1)
- Table 3 - Amber (#FFBF00)
- Table 4 - Terracotta (#E2725B)
- Table 5 - Champagne (#F7E7CE)
- Table 6 - Gold (#FFD700)

**Invités :** ~60-70 personnes

---

## 🎨 Design

### Palette de couleurs (Tropical Sunset)
- Blanc, Ivoire
- Rose poudré, Pêche, Corail
- Orange sunset
- Touches dorées

### Style
- Chic, chaleureux, romantique, lumineux
- Design premium sans effet kitsch
- Naturel et raffiné

### UX
- **Mobile first**
- Mini application web (pas une longue page)
- Navigation fluide
- 1-2 clics max par action
- Animations douces

---

## ⚡ Optimisations techniques

Le mariage est en Côte d'Ivoire → connexions mobiles limitées.

### Priorités
- Chargement < 2s sur 3G
- Images compressées (WebP + fallback)
- Lazy loading
- Service Worker (offline mode)
- < 2MB page initiale
- Pas de frameworks lourds

---

## 🛠️ Stack technique

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Données:** Google Sheets API
- **Stockage photos:** Firebase Storage
- **Auth (admin):** Firebase Authentication (optionnel)
- **Caching:** Service Worker, localStorage

---

## 📁 Structure du projet

```
Konandri-Weeding-/
├── PROMPT_FINAL.md          # Prompt complet (référence)
├── DATA_STRUCTURE.md         # Structure des données
├── README.md                 # Ce fichier
├── index.html                # Page d'accueil
├── app.js                    # Logique principale + Google Sheets
├── styles.css                # Styles Tropical Sunset
├── sw.js                     # Service Worker
└── assets/
    ├── images/               # Photos du couple, icônes
    └── fonts/                # Typographies
```

---

## 🚀 Démarrage

### Préalables
- Google Sheets API key (public)
- Firebase project (optionnel)
- Navigateur moderne

### Installation

1. **Cloner le repo**
   ```bash
   git clone https://github.com/marieaudekouame10-spec/Konandri-Weeding-.git
   cd Konandri-Weeding-
   ```

2. **Lancer localement**
   ```bash
   # Python 3
   python3 -m http.server 8000
   ```
   Puis ouvrir `http://localhost:8000`

3. **Déployer**
   - GitHub Pages (automatique)
   - Netlify
   - Vercel

---

## 📱 Responsive design

- Mobile-first (< 375px à 1200px)
- Adaptatif pour tous les appareils
- Touch-friendly
- Animations GPU-optimisées

---

## 🔐 Sécurité

- Validation côté client ET serveur
- Protection API (rate limiting)
- Authentification admin
- Modération contenu utilisateur
- Pas de données sensibles en frontend

---

## 📈 Performance

**Métriques cibles :**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total Bundle Size: < 200KB (JS + CSS)

---

## ♿ Accessibilité

- WCAG 2.1 AA compliant
- Contraste suffisant
- Textes alternatifs pour images
- Navigation au clavier
- Lecteur d'écran compatible

---

## 📖 Verset biblique

> « Par-dessus tout, revêtez-vous de l'amour, qui est le lien de la perfection. »
>
> *Colossiens 3:14*

---

## 📞 Contact & Support

- Email: yoane.marie.aude@wedding.ci
- Admin panel: `/admin` (Mot de passe: `Yoane2026`)

---

## 🎊 Objectif final

Créer une véritable **expérience digitale de mariage premium**, extension numérique du mariage, pas juste un site informatif.

**Le site doit refléter :**
- ✨ Un mariage **traditionnel ivoirien chic**
- 🌅 L'ambiance **Tropical Sunset** du jardin
- 💝 L'**amour et la convivialité** du couple
- 📱 Une **fluidité impeccable sur mobile**
- ⚡ Une **performance maximale** même avec faible connexion

---

**Dernière mise à jour:** 19 juillet 2026
