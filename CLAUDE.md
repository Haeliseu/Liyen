# Liyen — Site vitrine accompagnement numérique seniors

Site vitrine multi-audiences pour Liyen, activité d'accompagnement numérique pour seniors en Guadeloupe.
Cible : seniors, familles, institutions (CCAS, France Services, médecins).

---

## Stack technique

- Next.js 15 App Router + TypeScript + Tailwind CSS
- Template de base : Cruip "Open" (github.com/cruip/open-react-template)
- Linter/Formatter : Biome (remplace ESLint)
- Tests : Vitest + Testing Library + jest-dom
- CI/CD : GitHub Actions → build image Docker → push GHCR
- Déploiement : pull manuel depuis Portainer
- Reverse proxy : Nginx Proxy Manager (SSL auto)

---

## Commandes

```bash
npm run dev          # développement local
npm run build        # build production
npm test             # tests unitaires (Vitest, mode run)
npm run test:watch   # tests en mode watch
npm run lint         # Biome check
npm run lint:fix     # Biome check --write (auto-fix)
npm run format       # Biome format --write
```

---

## Structure du projet

```
src/
├── app/
│   ├── (marketing)/         # groupe de routes vitrine
│   │   ├── page.tsx         # /  — Accueil
│   │   ├── services/        # /services
│   │   ├── a-propos/        # /a-propos
│   │   ├── institutions/    # /institutions — CCAS, France Services
│   │   └── contact/         # /contact
│   ├── api/
│   │   └── contact/         # POST — envoi email via Resend
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                  # boutons, inputs, badges — atoms
│   ├── sections/            # Hero, Services, Testimonials, CTA — sections de pages
│   └── layout/              # Header, Footer, Nav
└── lib/
    ├── schemas/             # schémas Zod (contact, institutions)
    └── utils/               # fonctions pures
```

---

## Conventions de code

- Nommage fichiers : kebab-case (`hero-section.tsx`)
- Nommage composants : PascalCase (`HeroSection`)
- Imports : alias `@/` pour `src/`
- Exports : named exports pour les composants, default pour les pages
- Pas de `console.log` en production
- TypeScript strict — pas de `any`

---

## Tests

- Tests colocalisés : `__tests__/` à côté du fichier testé
- Nommage : `NomComposant.test.tsx`
- Ce qu'on teste : composants UI, schémas Zod, fonctions utilitaires
- Ce qu'on ne teste pas : pages entières, navigation (→ Playwright plus tard)
- Couverture cible : composants critiques + toute la logique `lib/`

Exemple de structure de test :
```
components/sections/__tests__/Hero.test.tsx
lib/schemas/__tests__/contactSchema.test.ts
```

---

## CI/CD

Pipeline GitHub Actions sur push `main` :
1. `npm ci`
2. `npm test` — si échec, le pipeline s'arrête
3. Build image Docker multi-stage
4. Push vers GHCR (`ghcr.io/<owner>/liyen`)

Le déploiement est **manuel** : pull de la nouvelle image depuis Portainer.

Variables d'environnement requises (GitHub Secrets) :
- `GITHUB_TOKEN` — fourni automatiquement par Actions
- `RESEND_API_KEY` — clé API Resend pour les emails de contact

---

## Formulaire de contact

- Validation côté client et serveur avec Zod
- Envoi via Resend (API Route Next.js)
- Deux formulaires : contact général + formulaire institutions
- Variable d'env locale : `RESEND_API_KEY` dans `.env.local`

---

## SEO

- Metadata via `generateMetadata()` sur chaque page
- Open Graph + Twitter Card
- `sitemap.xml` généré automatiquement (Next.js 15)
- `robots.txt` à la racine de `public/`
- Langue : `fr` dans le `<html lang>`

---

## Identité visuelle

Palette chaude et rassurante (à affiner) :
- Primaire : corail/terracotta
- Secondaire : vert doux
- Neutre : blanc cassé, gris clair
- Typo : lisible et généreuse pour accessibilité seniors

---

## Règles de comportement pour Claude Code

- Toujours lire un fichier avant de le modifier
- Ne jamais committer sans que les tests passent
- Créer les tests en même temps que le composant, pas après
- Préférer les Server Components Next.js par défaut, Client Component (`"use client"`) seulement si nécessaire
- Pour les formulaires : validation Zod côté serveur obligatoire, même si déjà validé côté client

---

## Tâches

### Phase 1 — Setup & CI/CD
- [x] Dockerfile multi-stage Next.js (node:alpine, output standalone)
- [x] docker-compose.yml
- [x] Workflow GitHub Actions (test → build → push GHCR)
- [x] Configuration Nginx Proxy Manager + domaine + SSL

### Phase 2 — Structure & navigation
- [x] Nettoyage et adaptation template Cruip
- [x] Configuration Tailwind (palette, fonts)
- [x] Layout global : Header, Footer, Nav mobile
- [x] Création des 5 pages (routes vides)
- [x] Composants : Hero, Cards services, Témoignages, CTA téléphone

### Phase 3 — Contenu & identité
- [x] Charte graphique (couleurs, typo, logo)
- [x] Textes : accueil, services, à propos, institutions
- [x] Formulaire contact (Zod + Resend)
- [x] Formulaire institutions
- [x] SEO : metadata, OG, sitemap, robots

### Phase 4 — Mise en prod
- [x] Audit Lighthouse (Performance, Accessibilité, SEO)
- [x] Tests cross-browser et mobile
- [x] Configuration DNS + go live
- [x] Analytics