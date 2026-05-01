# Go live — Liyen

## 1. Prérequis

- [ ] Raspberry Pi accessible depuis Internet (IP publique fixe ou DynDNS)
- [ ] Ports 80 et 443 ouverts sur le routeur (NAT/redirection vers le Pi)
- [ ] Nom de domaine acheté (ex. liyen.fr)
- [ ] Accès au panneau DNS du registrar

---

## 2. Configuration DNS

Chez votre registrar (OVH, Gandi, etc.), ajouter ces enregistrements :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | `@` | `<IP_PUBLIQUE_DU_PI>` | 3600 |
| A | `www` | `<IP_PUBLIQUE_DU_PI>` | 3600 |
| A | `analytics` | `<IP_PUBLIQUE_DU_PI>` | 3600 |

> Si l'IP change (box ADSL), utiliser un service DynDNS (DuckDNS, No-IP) et mettre l'enregistrement CNAME à la place.

Vérification de la propagation :
```bash
dig liyen.fr A +short
# Doit retourner votre IP publique
```

---

## 3. Démarrage de l'infrastructure

Sur le Raspberry Pi :

```bash
# 1. Cloner le dépôt (ou copier les fichiers)
git clone https://github.com/<owner>/liyen.git && cd liyen

# 2. Démarrer Nginx Proxy Manager + Umami (une seule fois)
docker compose -f docker-compose.infra.yml up -d

# 3. Vérifier que tout est démarré
docker compose -f docker-compose.infra.yml ps
```

---

## 4. Configuration Nginx Proxy Manager

Accéder à `http://<IP_PI>:81`

**Changer les identifiants par défaut immédiatement :**
- Email : `admin@example.com` → votre email
- Mot de passe : `changeme` → mot de passe fort

**Créer les Proxy Hosts :**

### Site principal (liyen.fr)
1. Hosts → Add Proxy Host
2. Domain Names : `liyen.fr`, `www.liyen.fr`
3. Forward Hostname/IP : `app` (nom du service Docker)
4. Forward Port : `3000`
5. Onglet SSL → Request a new SSL Certificate → Force SSL → cocher

### Analytics (analytics.liyen.fr)
1. Domain Names : `analytics.liyen.fr`
2. Forward Hostname/IP : `umami`
3. Forward Port : `3000`
4. SSL → Request a new SSL Certificate → Force SSL

---

## 5. Démarrage de l'application

```bash
# Créer le fichier de variables d'environnement
cp .env.example .env
# Éditer .env avec les vraies valeurs (RESEND_API_KEY, CONTACT_EMAIL, etc.)
nano .env

# Démarrer l'application (pull de l'image GHCR)
docker compose pull
docker compose up -d

# Vérifier les logs
docker compose logs -f app
```

---

## 6. Configuration Umami Analytics

1. Accéder à `https://analytics.liyen.fr`
2. Se connecter (admin / umami → changer immédiatement)
3. Settings → Websites → Add Website
   - Name : `Liyen`
   - Domain : `liyen.fr`
4. Copier le **Website ID** généré
5. Dans Portainer, ajouter les variables d'env au service `app` :
   - `NEXT_PUBLIC_UMAMI_URL=https://analytics.liyen.fr`
   - `NEXT_PUBLIC_UMAMI_WEBSITE_ID=<website_id_copié>`
6. Redémarrer le conteneur app

---

## 7. Checklist go live

### Fonctionnel
- [ ] `https://liyen.fr` charge la page d'accueil
- [ ] `https://www.liyen.fr` redirige vers `https://liyen.fr`
- [ ] Les 5 pages s'affichent sans erreur
- [ ] Le formulaire de contact envoie un email (tester avec une vraie adresse)
- [ ] Le formulaire institutions envoie un email
- [ ] Le CTA téléphone compose le bon numéro

### Technique
- [ ] HTTPS actif sur tous les domaines (cadenas vert)
- [ ] `https://liyen.fr/sitemap.xml` accessible
- [ ] `https://liyen.fr/robots.txt` accessible
- [ ] Console navigateur sans erreur JS

### SEO & Analytics
- [ ] Google Search Console : ajouter la propriété et soumettre le sitemap
- [ ] Umami : vérifier que les visites sont enregistrées
- [ ] Tester les Open Graph tags (https://www.opengraph.xyz/)

### Sécurité
- [ ] Mot de passe NPM changé
- [ ] Mot de passe Umami changé
- [ ] `UMAMI_DB_PASSWORD` et `UMAMI_APP_SECRET` définis avec des valeurs fortes
- [ ] Port 81 (NPM admin) bloqué depuis l'extérieur (firewall / règle iptables)

---

## 8. Mises à jour futures

```bash
# Après chaque push sur main, GitHub Actions build et push l'image.
# Sur le Pi, dans Portainer : pull la nouvelle image et redémarrer le conteneur.
# Ou en ligne de commande :
docker compose pull && docker compose up -d
```
