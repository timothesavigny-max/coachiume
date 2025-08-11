# Coachium — SaaS Fitness IA (UI complète)

**UI Next.js + Tailwind prête à déployer (Vercel)** pour un coach IA : Onboarding, Programme, Nutrition, Suivi, Pricing, Contact.

## Déployer (100% en ligne)
1. Uploade **le contenu** de ce dossier sur GitHub (à la racine du repo).
2. Sur Vercel → New Project → sélectionne le repo → Deploy.

## Lancer en local (facultatif)
```bash
npm install
npm run dev
# Ouvre http://localhost:3000
```

## Pages
- `/` Accueil
- `/onboarding` Questions → génère Programme + Nutrition
- `/programme` Plan des 4 semaines
- `/nutrition` Calories, macros, repas
- `/suivi` Saisie du poids + courbe SVG
- `/pricing` Tarifs
- `/contact` Contact

## Personnaliser
- Couleurs : `tailwind.config.js` et `app/globals.css`
- Logo : remplace `public/logo.svg` par ton logo

© 2025 Coachium
