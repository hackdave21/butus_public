# BUTUS — Site vitrine (butus.org)

Site de présentation de BUTUS, initiative togolaise d'économie circulaire. Il présente BUTUS et
annonce l'application mobile à venir. **Aucune fonctionnalité** (ni formulaire, ni compte, ni vente) :
voir [`CLAUDE.md`](CLAUDE.md) pour les règles de conception.

- Production : **https://butus.org**
- Hébergement : **Hostinger** (plan Cloud Startup), site `butus.org`
- Déploiement : **automatique** à chaque push sur `main`, via GitHub Actions (build Astro puis envoi par SSH)

---

## Sommaire

1. [Travailler en local](#1-travailler-en-local)
2. [Préparation avant le premier déploiement](#2-préparation-avant-le-premier-déploiement)
3. [Comment fonctionne le déploiement](#3-comment-fonctionne-le-déploiement)
4. [Mise en place sur Hostinger, étape par étape](#4-mise-en-place-sur-hostinger-étape-par-étape)
5. [Le workflow CI/CD (GitHub Actions)](#5-le-workflow-cicd-github-actions)
6. [Le fichier `.htaccess`](#6-le-fichier-htaccess)
7. [Domaine, DNS et HTTPS](#7-domaine-dns-et-https)
8. [Premier déploiement et vérifications](#8-premier-déploiement-et-vérifications)
9. [Au quotidien : publier, annuler, dépanner](#9-au-quotidien--publier-annuler-dépanner)
10. [Plan B : déploiement par FTP](#10-plan-b--déploiement-par-ftp)

---

## 1. Travailler en local

Prérequis : **Node.js 22 LTS** (minimum 18.20) et npm.

```powershell
npm ci
```

```powershell
npm run dev
```

Le site tourne sur http://localhost:4321.

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement avec rechargement à chaud |
| `npm run build` | Génère le site statique dans `dist/` |
| `npm run preview` | Sert le contenu de `dist/` pour le tester comme en production |

Le site est **100 % statique** : `dist/` contient uniquement du HTML, du CSS, un peu de JS et les
images. Aucun PHP, aucune base de données. C'est ce dossier, et lui seul, qui est envoyé sur Hostinger.

---

## 2. Préparation avant le premier déploiement

### 2.1 Contenu

- [ ] Relire chaque page à 360 px et à 1440 px, avec les animations réduites activées.
- [ ] Rechercher les `TODO` restants (`git grep TODO`) : horaires, mentions légales, réseaux sociaux,
      photo du fondateur. Les laisser visibles plutôt qu'inventer une information.
- [ ] Photos présentes dans `public/images/hero/` et `public/images/pages/`, en `.webp` de moins de 300 Ko.
      Manque encore : `pages/application.webp` et la **vraie** photo `pages/fondateur.jpg`.
- [ ] `public/og-image.png` (1200 × 630) à jour : c'est l'aperçu affiché quand on partage le lien sur WhatsApp.
- [ ] Mentions légales complètes (statut, adresse, responsable de publication, hébergeur :
      Hostinger International Ltd).

### 2.2 Technique

- [ ] `npm run build` passe sans erreur en local.
- [ ] `npm run preview` puis Lighthouse en mode mobile : **≥ 95** sur les 4 scores.
- [ ] `astro.config.mjs` contient bien `site: 'https://butus.org'` (sitemap et URL canoniques).
- [ ] `public/robots.txt` pointe vers `https://butus.org/sitemap-index.xml`.
- [ ] Le fichier `public/.htaccess` existe (voir [§ 6](#6-le-fichier-htaccess)).
- [ ] Le workflow `.github/workflows/deploy.yml` existe (voir [§ 5](#5-le-workflow-cicd-github-actions)).

### 2.3 Comptes

- [ ] Le compte Hostinger et le dépôt GitHub appartiennent à **BUTUS**, pas au compte personnel
      d'une seule personne. Au minimum, deux personnes de l'équipe y ont accès.
- [ ] L'abonnement Hostinger et le domaine `butus.org` sont en renouvellement automatique
      (actuellement : expiration le 2027-11-18).

---

## 3. Comment fonctionne le déploiement

```
 Développeur            GitHub                         GitHub Actions                       Hostinger
 ───────────            ──────                         ──────────────                       ─────────
 git push main  ──►  dépôt butus_public  ──►  1. npm ci                          
                                              2. npm run build  → dist/          
                                              3. rsync dist/ via SSH  ──────────►  public_html de butus.org
                                                                                    https://butus.org
```

- **Pull request** vers `main` : le site est seulement **construit** (vérification). Rien n'est publié.
- **Push sur `main`** (ou fusion d'une PR) : le site est construit **puis publié**.
- **Lancement manuel** possible depuis l'onglet *Actions* de GitHub (bouton *Run workflow*).

Pourquoi pas l'intégration Git de Hostinger ? Elle copie le dépôt tel quel, **sans lancer
`npm run build`**. Or un site Astro doit être construit avant d'être servi. GitHub Actions construit
le site sur ses propres machines et n'envoie que le résultat : rien à installer chez Hostinger.

---

## 4. Mise en place sur Hostinger, étape par étape

À faire **une seule fois**.

### Étape 1 — Activer l'accès SSH

1. hPanel → **Sites web** → `butus.org` → **Tableau de bord**.
2. Menu **Avancé** → **Accès SSH** → **Activer**.
3. Noter les informations affichées :
   - **IP** (ou nom d'hôte) du serveur ;
   - **Port** : en général `65002` chez Hostinger ;
   - **Nom d'utilisateur** : de la forme `u123456789`.

> Ces valeurs ne doivent **jamais** être écrites dans le dépôt. Elles vont dans les secrets GitHub (étape 4).

### Étape 2 — Créer une clé SSH réservée au déploiement

Sur votre ordinateur (PowerShell), créez une clé **sans phrase de passe**, utilisée uniquement par GitHub Actions :

```powershell
ssh-keygen -t ed25519 -C "github-actions-butus-org" -f "$HOME\.ssh\butus_deploy" -N '""'
```

Cela crée deux fichiers :

| Fichier | Contenu | Où le mettre |
|---|---|---|
| `butus_deploy.pub` | clé **publique** | Hostinger (étape 3) |
| `butus_deploy` | clé **privée** | Secret GitHub `SSH_PRIVATE_KEY` (étape 4), puis supprimer le fichier de l'ordinateur |

### Étape 3 — Autoriser la clé chez Hostinger

1. hPanel → `butus.org` → **Avancé** → **Accès SSH** → section **Clés SSH** → **Ajouter une clé SSH**.
2. Nom : `github-actions`. Coller le contenu de `butus_deploy.pub` :

   ```powershell
   Get-Content "$HOME\.ssh\butus_deploy.pub" | Set-Clipboard
   ```

3. Tester la connexion depuis votre ordinateur (remplacer les valeurs) :

   ```powershell
   ssh -i "$HOME\.ssh\butus_deploy" -p 65002 UTILISATEUR@IP_DU_SERVEUR
   ```

4. Une fois connecté, trouver le **chemin absolu** du dossier du site :

   ```bash
   ls ~/domains
   cd ~/domains/butus.org/public_html && pwd
   ```

   Le résultat ressemble à `/home/u123456789/domains/butus.org/public_html`. C'est la valeur du
   secret `DEPLOY_PATH`.

> ⚠️ **Choisir le bon dossier.** Le déploiement **remplace tout le contenu** du dossier cible
> (option `--delete`), sauf les chemins exclus dans le workflow. Ne jamais viser le dossier parent
> (`~/domains/butus.org`, qui contient `DO_NOT_UPLOAD_HERE`) ni `butus-api`.
>
> Organisation actuelle sur le serveur :
>
> ```
> ~/domains/butus.org/
> ├─ butus-api/            code de l'API (Laravel), déployé séparément
> ├─ DO_NOT_UPLOAD_HERE
> └─ public_html/          ← DEPLOY_PATH : site vitrine
>    ├─ api -> ../butus-api/public   sert api.butus.org : protégé par --exclude
>    ├─ api.vide/                    protégé par --exclude
>    └─ default.php                  page d'attente Hostinger, supprimée au 1er déploiement
> ```

5. Faire une **sauvegarde** du contenu actuel de `public_html` (aujourd'hui, la page Hostinger
   « Bientôt disponible ») : hPanel → **Fichiers** → **Sauvegardes**, ou téléchargement depuis le
   gestionnaire de fichiers. Le premier déploiement supprimera cette page d'attente (`default.php`).

### Étape 4 — Ajouter les secrets dans GitHub

Dépôt GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.

| Secret | Valeur | Exemple |
|---|---|---|
| `SSH_HOST` | IP ou nom d'hôte du serveur | `123.45.67.89` |
| `SSH_PORT` | Port SSH | `65002` |
| `SSH_USER` | Nom d'utilisateur SSH | `u123456789` |
| `SSH_PRIVATE_KEY` | Contenu **complet** de `butus_deploy`, lignes `-----BEGIN…` et `-----END…` comprises | |
| `DEPLOY_PATH` | Chemin absolu de `public_html`, **sans** `/` final | `/home/u123456789/domains/butus.org/public_html` |

Pour copier la clé privée :

```powershell
Get-Content "$HOME\.ssh\butus_deploy" -Raw | Set-Clipboard
```

Une fois le secret enregistré, supprimer la clé privée de l'ordinateur :

```powershell
Remove-Item "$HOME\.ssh\butus_deploy"
```

**Recommandé :** créer un environnement de déploiement protégé. *Settings* → **Environments** →
**New environment** → `production`. Vous pouvez y limiter le déploiement à la branche `main` et
y ranger les secrets ci-dessus à la place des secrets du dépôt.

### Étape 5 — Protéger la branche `main` (recommandé)

*Settings* → **Branches** → **Add branch ruleset** sur `main` :
- exiger une pull request avant fusion ;
- exiger que la vérification **Build** soit verte.

Ainsi, un site qui ne se construit pas ne peut jamais être publié.

---

## 5. Le workflow CI/CD (GitHub Actions)

Fichier [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (déjà présent dans le dépôt) :

```yaml
name: Build et déploiement

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

# Un seul déploiement à la fois ; un nouveau push annule le build précédent en cours.
concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Installer les dépendances
        run: npm ci

      - name: Construire le site
        run: npm run build

      - name: Vérifier la sortie
        run: |
          test -f dist/index.html
          test -f dist/404.html
          test -f dist/.htaccess
          du -sh dist

      - uses: actions/upload-artifact@v4
        with:
          name: site
          path: dist/
          include-hidden-files: true   # indispensable pour garder .htaccess
          retention-days: 7

  deploy:
    name: Déployer sur Hostinger
    needs: build
    if: github.event_name != 'pull_request' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://butus.org
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: site
          path: dist/

      - name: Charger la clé SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Ajouter le serveur aux hôtes connus
        run: ssh-keyscan -p "${{ secrets.SSH_PORT }}" -H "${{ secrets.SSH_HOST }}" >> ~/.ssh/known_hosts

      - name: Envoyer les fichiers (rsync)
        run: |
          # --delete supprime ce qui n'est plus dans le site, SAUF les chemins exclus :
          #   /api       lien vers ../butus-api/public : c'est api.butus.org, ne JAMAIS supprimer
          #   /api.vide  dossier lié à l'API
          #   /.well-known/  certificats SSL de Hostinger
          rsync -az --delete --stats \
            --exclude '/api' \
            --exclude '/api.vide' \
            --exclude '/.well-known/' \
            -e "ssh -p ${{ secrets.SSH_PORT }}" \
            dist/ "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.DEPLOY_PATH }}/"

      - name: Vérifier que le lien de l'API est intact
        run: ssh -p "${{ secrets.SSH_PORT }}" "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}" "test -L '${{ secrets.DEPLOY_PATH }}/api' && echo 'Lien api intact'"

      - name: Vérifier que le site répond
        run: |
          sleep 5
          curl -fsSIL https://butus.org/ | head -n 1
```

Points importants :

- `dist/` (barre oblique finale) envoie le **contenu** du dossier, pas le dossier lui-même.
- `--delete` supprime sur le serveur les fichiers qui n'existent plus dans le site (anciennes images,
  anciens fichiers `_astro/…`). C'est pour cela que `DEPLOY_PATH` doit être exact.
- `--exclude` protège de `--delete` trois chemins qui n'appartiennent pas au site vitrine :
  - `/api` : **lien vers `../butus-api/public`, c'est lui qui sert `api.butus.org`**. Le supprimer couperait l'API ;
  - `/api.vide` : dossier lié à l'API ;
  - `/.well-known/` : dossier utilisé par Hostinger pour le certificat SSL.
- Après l'envoi, le workflow vérifie que le lien `api` existe toujours. Sinon, il échoue en rouge.
- Si un jour un autre dossier est ajouté dans `public_html` pour un autre service, **l'ajouter aux `--exclude`
  avant le déploiement suivant**, sinon il sera supprimé.
- `include-hidden-files: true` : sans cette option, `.htaccess` serait perdu entre les deux étapes.

---

## 6. Le fichier `.htaccess`

Hostinger sert les sites avec LiteSpeed, compatible avec les fichiers `.htaccess` d'Apache.
Fichier [`public/.htaccess`](public/.htaccess) (déjà présent dans le dépôt). Astro le copie tel quel dans `dist/` à chaque build.

```apache
# ── BUTUS · butus.org ──────────────────────────────────────────
#
# ⚠️ L'API (api.butus.org) est servie depuis public_html/api (lien vers ../butus-api/public).
# Ce fichier s'applique donc AUSSI aux requêtes de l'API. Chaque règle est limitée au
# domaine butus.org, ou choisie pour être sans effet sur l'API.

Options -Indexes
# index.php reste listé pour l'API (Laravel), qui hérite de ce réglage.
DirectoryIndex index.html index.php

# Repère les requêtes du site vitrine (butus.org et www.butus.org), pas celles de l'API.
SetEnvIfNoCase Host ^(www\.)?butus\.org$ BUTUS_SITE

# 1. HTTPS obligatoire et www → apex (redirection 301 unique), site vitrine seulement
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?butus\.org$ [NC]
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://butus.org%{REQUEST_URI} [L,R=301]

# 2. Page 404 personnalisée (générée par Astro). L'API gère ses propres 404 via Laravel.
ErrorDocument 404 /404.html

# 3. Sécurité (site vitrine seulement)
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000" env=BUTUS_SITE
  Header always set X-Content-Type-Options "nosniff" env=BUTUS_SITE
  Header always set Referrer-Policy "strict-origin-when-cross-origin" env=BUTUS_SITE
  Header always set X-Frame-Options "SAMEORIGIN" env=BUTUS_SITE
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()" env=BUTUS_SITE
</IfModule>

# 4. Cache navigateur (site vitrine seulement ; pas de mod_expires, qui toucherait aussi l'API)
<IfModule mod_headers.c>
  # CSS, JS et polices : générés par Astro dans /_astro/ avec une empreinte dans le nom
  <FilesMatch "\.(css|js|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable" env=BUTUS_SITE
  </FilesMatch>
  <FilesMatch "\.(webp|png|jpe?g|svg|ico)$">
    Header set Cache-Control "public, max-age=2592000" env=BUTUS_SITE
  </FilesMatch>
  # Pages HTML : toujours revalider pour voir la dernière version
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache" env=BUTUS_SITE
  </FilesMatch>
</IfModule>

# 5. Compression (sans effet sur les réponses JSON de l'API)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/xml text/plain
</IfModule>
```

> **Ce `.htaccess` s'applique aussi à l'API.** `api.butus.org` est servi depuis `public_html/api`, donc
> le serveur lit aussi ce fichier pour les requêtes de l'API. C'est pourquoi les redirections, les en-têtes
> et le cache sont limités à `butus.org` (variable `BUTUS_SITE`), et pourquoi `index.php` reste dans
> `DirectoryIndex`. Après le premier déploiement, vérifier que `https://api.butus.org` répond comme avant.

---

## 7. Domaine, DNS et HTTPS

Le domaine **butus.org** est déjà enregistré chez Hostinger et rattaché au site `butus.org`
(statut *Actif*, renouvellement automatique). Comme domaine et hébergement sont au même endroit,
les DNS sont normalement déjà corrects. À vérifier une fois :

1. hPanel → **Noms de domaine** → `butus.org` → **DNS / Serveurs de noms** :
   - serveurs de noms Hostinger (`ns1.dns-parking.com`, `ns2.dns-parking.com`) ;
   - enregistrement **A** `@` → IP du site (celle de l'étape 1) ;
   - enregistrement **CNAME** `www` → `butus.org` (ou un **A** `www` vers la même IP).
   - Ne pas toucher aux enregistrements de `api` ni à ceux des e-mails (MX, TXT).
2. hPanel → `butus.org` → **Sécurité** → **SSL** : vérifier que le certificat (Let's Encrypt,
   gratuit) est **actif** pour `butus.org` **et** `www.butus.org`.
3. Activer **Forcer HTTPS** dans le même menu (le `.htaccess` le fait aussi : les deux sont compatibles).

Une modification DNS peut prendre de quelques minutes à 24 h pour se propager.

---

## 8. Premier déploiement et vérifications

1. Une fois les secrets en place (étape 4), pousser `public/.htaccess` et `.github/workflows/deploy.yml` sur `main` :

   ```powershell
   git add .github/workflows/deploy.yml public/.htaccess
   ```

   ```powershell
   git commit -m "Déploiement automatique sur Hostinger"
   ```

   ```powershell
   git push origin main
   ```

2. GitHub → onglet **Actions** → suivre le workflow *Build et déploiement*. Durée habituelle : 1 à 2 minutes.
3. Vérifier en ligne :

| Test | Résultat attendu |
|---|---|
| https://butus.org | La page d'accueil BUTUS s'affiche (plus la page « Bientôt disponible » de Hostinger) |
| http://butus.org | Redirection 301 vers https://butus.org |
| https://www.butus.org | Redirection 301 vers https://butus.org |
| https://butus.org/page-inexistante | Page 404 BUTUS |
| https://butus.org/mission, `/ce-que-fait-butus`, `/application`, `/contact`, `/mentions-legales` | Chaque page s'affiche |
| https://butus.org/sitemap-index.xml | Sitemap XML |
| https://butus.org/robots.txt | Fichier robots |
| Lien envoyé dans WhatsApp | Aperçu avec l'image « BUTUS » sur fond vert |
| PageSpeed Insights (mobile) | ≥ 95 sur les 4 scores |

En cas d'ancien contenu affiché : vider le cache dans hPanel (**Performance** → **Cache** → **Vider le cache**)
puis recharger avec `Ctrl + F5`.

4. Ajouter le site dans **Google Search Console** (propriété de domaine `butus.org`, validation par
   enregistrement TXT dans les DNS Hostinger) et y soumettre `https://butus.org/sitemap-index.xml`.

---

## 9. Au quotidien : publier, annuler, dépanner

### Publier une modification

```
branche → pull request → Build vert → fusion dans main → déploiement automatique
```

Pour une petite correction, un push direct sur `main` fonctionne aussi (si la branche n'est pas protégée).

### Revenir à une version précédente

- **Le plus propre :** `git revert <commit>` puis push sur `main`. Le site est republié sans la modification.
- **Le plus rapide :** GitHub → **Actions** → choisir un ancien déploiement réussi → **Re-run all jobs**.
  Le site est reconstruit à partir de ce commit.

### Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| `Permission denied (publickey)` | Clé publique absente chez Hostinger, ou secret `SSH_PRIVATE_KEY` incomplet | Refaire les étapes 3 et 4. Copier la clé privée entière, lignes `BEGIN`/`END` comprises |
| `api.butus.org` ne répond plus après un déploiement | Lien `public_html/api` supprimé | Le recréer en SSH : `cd ~/domains/butus.org/public_html && ln -s ../butus-api/public api`, puis vérifier les `--exclude` du workflow |
| `Connection timed out` | Mauvais port ou SSH désactivé | Vérifier `SSH_PORT` (65002) et que l'accès SSH est activé dans hPanel |
| `Host key verification failed` | Étape `ssh-keyscan` en échec | Vérifier `SSH_HOST` et `SSH_PORT` |
| `rsync: … No such file or directory` | `DEPLOY_PATH` faux | Se connecter en SSH et refaire `pwd` dans le bon `public_html` |
| La page Hostinger « Bientôt disponible » reste affichée | Ancien `default.php` ou cache | Vérifier que `default.php` a disparu, puis vider le cache Hostinger |
| Erreur 404 sur `/mission` mais pas sur `/` | Fichiers envoyés dans un sous-dossier | Vérifier la barre oblique finale de `dist/` dans la commande rsync |
| Pas de redirection HTTPS / www | `.htaccess` absent du serveur | Vérifier `include-hidden-files: true` et la présence de `dist/.htaccess` |
| Échec à l'étape *Build* | Erreur dans le code | Lancer `npm run build` en local, corriger, repousser |

---

## 10. Plan B : déploiement par FTP

À utiliser seulement si l'accès SSH n'est pas disponible. Plus lent que rsync, mais suffisant pour ce site.

1. hPanel → `butus.org` → **Fichiers** → **Comptes FTP** : créer un compte FTP dont le dossier
   racine est le `public_html` du site.
2. Secrets GitHub : `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.
3. Dans le workflow, remplacer les étapes SSH et rsync du job `deploy` par :

```yaml
      - name: Envoyer les fichiers (FTP)
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          protocol: ftps
          local-dir: ./dist/
          server-dir: ./
          dangerous-clean-slate: false
          exclude: |
            **/.well-known/**
```

L'action garde un fichier `.ftp-deploy-sync-state.json` sur le serveur pour n'envoyer que les fichiers
modifiés lors des déploiements suivants.

---

## Structure du projet

```
butus_public/
├─ .github/workflows/deploy.yml   CI/CD (voir § 5)
├─ public/                        copié tel quel dans dist/ (images, favicon, og-image, robots, .htaccess)
├─ src/                           pages, composants, styles, données
├─ astro.config.mjs               site: https://butus.org, sortie statique, sitemap
├─ CLAUDE.md                      règles de conception et charte graphique
└─ PROMPTS_IMAGES.md              prompts de génération des photos
```
