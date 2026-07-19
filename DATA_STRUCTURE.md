# 📊 Structure des données réelles

## Google Sheets - Source unique

**URL:** https://docs.google.com/spreadsheets/d/1oNFzsq3Wuqyej18k0K73bysJMaYZIoLrYYB1dcOACGU/edit?usp=sharing

**ID:** `1oNFzsq3Wuqyej18k0K73bysJMaYZIoLrYYB1dcOACGU`

**Feuille:** Sheet1 (gid=0)

---

## Colonnes

| # | Nom Colonne | Type | Description | Exemple |
|---|---|---|---|---|
| A | Renseignez vos noms et prénoms | String | Prénom et Nom de l'invité principal | "Assagou Josaphat Sosthene" |
| B | Si oui, veuillez renseigner... | String | Accompagnateur(trice) - OPTIONNEL | "DIGBA Marie-France" ou VIDE |
| C | numéro des tables | String | Numéro de la table | "Table 1", "Table 2", etc. |
| D | NOMS DES tables | String | Nom de la table - OPTIONNEL | "Coral", "Blush", "Amber", etc. |

---

## Tables (6 au total)

### Couleurs correspondantes (Design Tropical Sunset)

| Table | Nom | Couleur Hex | Description |
|---|---|---|---|
| Table 1 | Coral | #FF7F50 | Corail - Chaud, accueillant |
| Table 2 | Blush | #FFB6C1 | Rose poudré - Romantique |
| Table 3 | Amber | #FFBF00 | Ambre - Chaud, lumineux |
| Table 4 | Terracotta | #E2725B | Terre cuite - Naturel |
| Table 5 | Champagne | #F7E7CE | Champagne - Élégant, ivoire |
| Table 6 | Gold | #FFD700 | Or - Premium, raffiné |

---

## Exemple de données (10 premières lignes)

```
Renseignez vos noms et prénoms | Si oui, veuillez... | numéro des tables | NOMS DES tables
Assagou Josaphat Sosthene | | Table 1 | Coral
Koné Ismaël | | Table 1 | 
Konan David | | Table 1 | 
Cyrille Tresor Ntakpe | | Table 1 | 
BAMBA MOUSSA | | Table 1 | 
Coulibaly Mohamed Zanape | | Table 1 | 
Boni Mahicha | | Table 1 | 
SERI GNOLOU DAVID MARSHALL | | Table 1 | 
FOFANA Baba | | Table 2 | Blush
DIBY Ulrich | DIGBA Marie-France | Table 2 | 
```

---

## Règles de traitement des données

### 1. **Nettoyage**
- Supprimer les espaces inutiles (trim)
- Gérer les lignes complètement vides
- Normaliser les majuscules/minuscules pour la recherche

### 2. **Recherche intelligente (Fuzzy Search)**
- Accent insensible (é = e, ç = c, etc.)
- Tirets et espaces oubliés
- Ordre prénom/nom inversé
- Correction de fautes mineures (Levenshtein distance)

**Exemples de recherche valides :**
- "Assagou Josaphat Sosthene"
- "Josaphat Assagou"
- "assagou"
- "Assagou Sosthene"
- "assagou j"

### 3. **Groupage par table**
- Grouper tous les invités par "numéro des tables"
- Pour chaque groupe, associer le "NOMS DES tables" (s'il existe)
- Si le nom de table est vide, afficher seulement le numéro

### 4. **Co-convives**
- Un invité avec une colonne B remplie = il a un accompagnateur
- Chercher la personne nommée en colonne B dans la liste
- Afficher le lien entre les deux

---

## Statistiques actuelles

- **Nombre total d'invités** : ~60-70
- **Nombre de tables** : 6
- **Invités avec accompagnateur** : ~5-10
- **Noms de tables manquants** : Quelques cellules

---

## API Google Sheets

### URL de récupération CSV
```
https://docs.google.com/spreadsheets/d/1oNFzsq3Wuqyej18k0K73bysJMaYZIoLrYYB1dcOACGU/export?format=csv&gid=0
```

### URL d'accès JSON (via API v4)
```
https://sheets.googleapis.com/v4/spreadsheets/1oNFzsq3Wuqyej18k0K73bysJMaYZIoLrYYB1dcOACGU/values/Sheet1?key=YOUR_API_KEY
```

### Authentification
- API key publique (pour lecture seule)
- Ou OAuth2 pour plus de sécurité

---

## Mise en cache

- **localStorage** : Stockage local des données (2MB max)
- **Service Worker** : Cache HTTP persistant
- **Revalidation** : Toutes les 5 minutes

---

## Évolutions futures

- Migration vers **Firebase Realtime Database** (temps réel)
- Ajout de colonnes supplémentaires (email, téléphone, allergies, etc.)
- Admin panel pour modification directe depuis le site
