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

> Si l'IP change (box ADSL), utiliser un service DynDNS (DuckDNS, No-IP) et mettre l'enregistrement CNAME à la place.

Vérification de la propagation :
```bash
dig liyen.fr A +short
# Doit retourner votre IP publique
```

---

## 3. Démarrage de l'infrastructure

Sur le Raspberry Pi, installer Nginx Proxy Manager (reverse proxy + SSL) :

```bash
# Créer un dossier dédié
mkdir -p ~/npm && cd ~/npm

# docker-compose.yml minimal pour NPM seul
cat > docker-compose.yml <<'EOF'
services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "81:81"
    volumes:
      - npm_data:/data
      - npm_letsencrypt:/etc/letsencrypt

volumes:
  npm_data:
  npm_letsencrypt:
EOF

docker compose up -d
```

---

## 4. Configuration Nginx Proxy Manager

Accéder à `http://<IP_PI>:81`

**Changer les identifiants par défaut immédiatement :**
- Email : `admin@example.com` → votre email
- Mot de passe : `changeme` → mot de passe fort

**Créer le Proxy Host :**

1. Hosts → Add Proxy Host
2. Domain Names : `liyen.fr`, `www.liyen.fr`
3. Forward Hostname/IP : `<IP_PI>` (ou nom du service si même réseau Docker)
4. Forward Port : `3000`
5. Onglet SSL → Request a new SSL Certificate → Force SSL → cocher

---

## 5. Démarrage de l'application

```bash
# Cloner le dépôt
git clone https://github.com/Haeliseu/Liyen.git && cd Liyen

# Créer le fichier de variables d'environnement
cp .env.example .env
nano .env  # renseigner RESEND_API_KEY et CONTACT_EMAIL

# Démarrer l'application (pull de l'image GHCR)
docker compose pull
docker compose up -d

# Vérifier les logs
docker compose logs -f app
```

---

## 6. Checklist go live

### Fonctionnel
- [ ] `https://liyen.fr` charge la page d'accueil
- [ ] `https://www.liyen.fr` redirige vers `https://liyen.fr`
- [ ] Les 5 pages s'affichent sans erreur
- [ ] Le formulaire de contact envoie un email (tester avec une vraie adresse)
- [ ] Le formulaire institutions envoie un email
- [ ] Le CTA téléphone compose le bon numéro

### Technique
- [ ] HTTPS actif (cadenas vert)
- [ ] `https://liyen.fr/sitemap.xml` accessible
- [ ] `https://liyen.fr/robots.txt` accessible
- [ ] Console navigateur sans erreur JS

### SEO
- [ ] Google Search Console : ajouter la propriété et soumettre le sitemap
- [ ] Tester les Open Graph tags (https://www.opengraph.xyz/)

### Sécurité
- [ ] Mot de passe NPM changé
- [ ] Port 81 (NPM admin) bloqué depuis l'extérieur (firewall / règle iptables)

---

## 7. Mises à jour futures

```bash
# Après chaque push sur master, GitHub Actions build et push l'image.
# Sur le Pi :
docker compose pull && docker compose up -d
```
