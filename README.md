# Portfolio — Fiona Pontoparia

Portfolio web statique, interactif et responsive, conçu en Vanilla JavaScript, HTML5 et CSS3 sans framework ni dépendance externe.

## Fonctionnalités

* **Architecture modulaire Vanilla JS** : Découpage en modules autonomes (`window.Portfolio`) sans étape de compilation ni bundler, permettant une exécution directe en local (`file://`) ou sur hébergeur statique.
* **Contenu dynamique piloté par données** : Données du profil, projets, parcours et compétences centralisées dans `assets/data/content.js` pour une maintenance simplifiée.
* **Design fluide et responsive** : Mise en page adaptative (mobile, tablette, desktop) basée sur les variables CSS, le dimensionnement relatif (`rem`, `ch`) et la typographie fluide (`clamp()`).
* **Fenêtre modale dynamique** : Système de pop-up simulant l'ouverture de fichiers pour détailler les projets, expériences et engagements.
* **Navigation & ScrollSpy** : Menu dock flottant synchronisé en temps réel avec le défilement des sections.
* **Curseur personnalisé** : Anneau fluide suivant le pointeur sur les interfaces bureau compatibles.
* **Gestion du formulaire de contact** : Architecture découplée acceptant plusieurs connecteurs d'envoi (`ConsoleEmailSender`, `FormspreeSender`, `EmailJSSender`).

## Structure du projet

```text
portfolio/
├── index.html                  # Structure principale du document
├── assets/
│   ├── css/
│   │   ├── base.css            # Styles globaux, grille d'arrière-plan et typographie
│   │   ├── cards.css           # Grilles et cartes de projets
│   │   ├── cursor.css          # Animation et style du curseur personnalisé
│   │   ├── form.css            # Style du formulaire de contact
│   │   ├── nav.css             # Barre de navigation (dock)
│   │   ├── sections.css        # Conteneurs de section et blocs de compétences
│   │   ├── timeline.css        # Chronologie du parcours
│   │   ├── variables.css       # Palette de couleurs, rayons et ombres CSS
│   │   └── window.css          # Fenêtre modale / pop-up
│   ├── data/
│   │   └── content.js          # Données textuelles du portfolio
│   └── js/
│       ├── main.js             # Point d'entrée et initialisation des modules
│       └── modules/
│           ├── contactForm.js      # Gestion et validation du formulaire
│           ├── contentLoader.js    # Chargement des données
│           ├── customCursor.js     # Logique du pointeur interactif
│           ├── dom.js              # Helpers de création d'éléments DOM
│           ├── navRenderer.js      # Génération des liens de navigation
│           ├── scrollSpy.js        # Détection de la section active à l'écran
│           ├── sectionRenderers.js # Rendu HTML des différentes sections
│           ├── windowController.js # Contrôle d'affichage de la modale
│           └── emailSenders/       # Adaptateurs d'envoi d'e-mail
│               ├── ConsoleEmailSender.js
│               ├── EmailJSSender.js
│               ├── EmailSender.js
│               └── FormspreeSender.js

```
Lancement
En local
Ouvrez directement le fichier index.html dans n'importe quel navigateur (double-clic supporté sans serveur web requis).

Pour utiliser un serveur local léger :

Bash
# Avec Python 3
python -m http.server 8000
Déploiement
Le projet est prêt pour un hébergement statique (GitHub Pages, Vercel, Netlify). Il suffit de pousser les fichiers à la racine de la branche de publication.

Configuration
Mise à jour des informations
Modifiez les entrées de l'objet global dans assets/data/content.js pour ajouter ou adapter vos expériences, projets, compétences et coordonnées.

Activation de l'envoi de mail
Dans assets/js/main.js, remplacez le connecteur de test ConsoleEmailSender par le service de votre choix :

JavaScript
// Exemple pour Formspree
const emailSender = new P.emailSenders.FormspreeSender('[https://formspree.io/f/VOTRE_ID](https://formspree.io/f/VOTRE_ID)');

// Exemple pour EmailJS
const emailSender = new P.emailSenders.EmailJSSender({
  serviceId: 'VOTRE_SERVICE_ID',
  templateId: 'VOTRE_TEMPLATE_ID',
  publicKey: 'VOTRE_PUBLIC_KEY'
});
