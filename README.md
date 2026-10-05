# Portfolio — Fiona Pontoparia

Portfolio web d'ingénieure interactif, fluide et accessible, développé en **Vanilla JavaScript**, **HTML5** et **CSS3** sans framework ni dépendance externe.

---

## ✨ Fonctionnalités & Expérience Utilisateur

* **Architecture modulaire Vanilla JS** : Découpage en composants autonomes (`window.Portfolio`), sans étape de build ni bundler, garantissant une exécution immédiate en local par simple double-clic (`file://`) ou sur n'importe quel hébergeur statique.
* **Typographie & Design System haute fidélité** :
  * Association typographique moderne : **Plus Jakarta Sans** (élégance, lisibilité et modernité) + **JetBrains Mono** (précision technique, tags et chemins).
  * Thème clair et thème sombre (Dark Mode) avec persistance dans le `localStorage` et détection automatique des préférences du système.
  * Barre de navigation flottante en verre dépoli (*frosted glass*), indicateur actif et commutateur de thème intégré sans conflit mobile.
* **Hero Section interactive** :
  * Badge de statut animé avec pulsation : *À l'écoute d'opportunités · Alternance Ingénieure*.
  * Portrait mis en valeur avec bordure lumineuse et badge académique.
  * Cartes d'indicateurs clés (années d'expérience, applications sécurisées, double profil MOA/MOE).
  * Boutons d'action rapide (CTA) : exploration des projets, téléchargement direct du CV et prise de contact.
* **Galerie de Projets avec Filtres dynamiques** :
  * Filtrage instantané par catégorie (*Tous*, *Gestion de projet & SI*, *Sécurité SI*, *Développement Web*, *Académique*).
  * Cartes de projets visuelles avec bannières de prévisualisation, statuts de déploiement, extensions de fichiers et badges de technologies visibles directement.
* **Fenêtre Modale Interactive (macOS / Terminal Style)** :
  * Contrôles de fenêtre (pastilles rouge, jaune, verte), fil d'Ariane dynamique et gestion du focus.
  * **Navigation séquentielle** : boutons Précédent/Suivant et touches du clavier (← / →) pour parcourir tous les projets sans quitter la modale.
  * Blocage du scroll d'arrière-plan (`modal-open`) et fermeture rapide via Échap ou clic externe.
* **Matrice de Compétences avec Recherche en direct** :
  * Répartition en 5 piliers professionnels (Pilotage MOA/MOE, SI & ERP, Socle Technique, Sécurité SI, Posture).
  * Barre de recherche instantanée mettant en surbrillance les compétences correspondantes au fil de la frappe.
* **Parcours Chronologique & Éthique / RSE** :
  * Chronologie interactive avec puces lumineuses au survol (formation, expérience, engagement).
  * Mise en valeur de l'engagement sociétal (Service Civique chez Unis Cité / Ambassadrice du Code, bénévolat aux Restos du Cœur).
* **Hub de Contact & Formulaire** :
  * Bouton de copie en 1 clic de l'adresse e-mail avec alerte toast.
  * Formulaire interactif avec validation en direct (nom, email, sujet, message).
  * Découplage de l'envoi : prêt pour Formspree, EmailJS ou fallback automatique vers le client de messagerie par défaut.
* **Curseur fluide personnalisé** :
  * Pointeur et anneau amorti sur grand écran, avec désactivation automatique sur smartphones, tablettes tactiles ou en mode de réduction de mouvement.

---

## 📂 Structure du projet

```text
portfolio/
├── index.html                  # Structure HTML sémantique & métadonnées SEO/OpenGraph
├── README.md                   # Documentation du projet
├── assets/
│   ├── CV.pdf                  # Curriculum Vitae officiel au format PDF
│   ├── css/
│   │   ├── base.css            # Styles globaux, grille de fond et typographie
│   │   ├── cards.css           # Grille de projets, filtres et cartes riches
│   │   ├── cursor.css          # Animation du curseur personnalisé
│   │   ├── form.css            # Hub de contact, validation et disposition 2 colonnes
│   │   ├── nav.css             # Dock flottant et commutateur de thème
│   │   ├── sections.css        # Sections Hero, Compétences avec recherche, Éthique & FAB
│   │   ├── timeline.css        # Chronologie visuelle du parcours
│   │   ├── variables.css       # Tokens de couleurs (Light/Dark), ombres et rayons
│   │   └── window.css          # Modale interactive, barre de titre et navigation
│   ├── data/
│   │   └── content.js          # Données centralisées (profil, projets, compétences, contact)
│   ├── img/                    # Illustrations et photos
│   │   ├── selfi.jpg
│   │   ├── erp.jpg
│   │   ├── mdp.png
│   │   ├── CreditApp.png
│   │   ├── Formula.png
│   │   ├── FA27INFO.jpg
│   │   └── UC.jpg
│   └── js/
│       ├── main.js             # Point d'entrée et orchestration des modules
│       └── modules/
│           ├── contactForm.js      # Gestion et validation du formulaire
│           ├── contentLoader.js    # Chargement asynchrone des données
│           ├── customCursor.js     # Logique d'animation du curseur
│           ├── dom.js              # Helpers de création d'éléments DOM sécurisés
│           ├── navRenderer.js      # Génération du menu dock et gestion du thème
│           ├── scrollSpy.js        # Détection précise de la section active à l'écran
│           ├── sectionRenderers.js # Rendu des sections, filtres, recherche et toasts
│           ├── windowController.js # Contrôleur de modale avec navigation séquentielle
│           └── emailSenders/       # Adaptateurs d'envoi d'e-mail
│               ├── ConsoleEmailSender.js
│               ├── EmailJSSender.js
│               ├── EmailSender.js
│               └── FormspreeSender.js
```

---

## 🚀 Utilisation & Lancement

### Lancement local immédiat
Ouvrez simplement le fichier `index.html` dans votre navigateur web (double-clic direct sans serveur requis).

### Avec un serveur HTTP local (optionnel)
```bash
# Avec Python (si disponible) :
python -m http.server 8000

# Avec Node / npx (si disponible) :
npx serve .
```

### Déploiement en ligne
Le site est 100% statique et prêt pour un déploiement instantané :
* **GitHub Pages** : Poussez le dépôt sur GitHub et activez GitHub Pages dans les paramètres du dépôt.
* **Vercel / Netlify** : Importez le dépôt et déployez sans configuration de build nécessaire.

---

## ⚙️ Configuration & Personnalisation

### 1. Modifier vos informations
Ouvrez `assets/data/content.js` pour adapter vos descriptions, vos projets, vos badges ou vos coordonnées.

### 2. Connecter le formulaire de contact en production
Par défaut, `ConsoleEmailSender` est configuré avec ouverture pré-remplie de la messagerie par défaut. Pour activer un envoi d'API direct en arrière-plan, modifiez la ligne correspondante dans `assets/js/main.js` :

**Option A — Formspree (recommandé, 2 minutes de configuration) :**
1. Créez un compte gratuit sur [formspree.io](https://formspree.io) et créez un nouveau formulaire ciblant `pontofiona@gmail.com`.
2. Dans `assets/js/main.js` :
```javascript
const emailSender = new P.emailSenders.FormspreeSender('https://formspree.io/f/VOTRE_ID_FORMSPREE');
```

**Option B — EmailJS :**
1. Créez un compte sur [emailjs.com](https://www.emailjs.com).
2. Dans `assets/js/main.js` :
```javascript
const emailSender = new P.emailSenders.EmailJSSender({
  serviceId: 'VOTRE_SERVICE_ID',
  templateId: 'VOTRE_TEMPLATE_ID',
  publicKey: 'VOTRE_CLE_PUBLIQUE'
});
```
