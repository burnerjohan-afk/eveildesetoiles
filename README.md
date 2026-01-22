# Éveil des Étoiles - Portail B2B Multi-Tenant

Site vitrine + portail client B2B sécurisé multi-tenant pour consultante/formatrice petite enfance.

## 🚀 Stack Technique

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: Magic Link maison (email) avec JWT sessions
- **Storage**: Local (dev) / S3 compatible (prod)
- **Email**: Resend (production) / Console log (développement)
- **Déploiement**: Vercel-ready

## 📁 Architecture du Projet

```
/
├── app/
│   ├── (marketing)/          # Pages publiques
│   ├── (auth)/               # Authentification
│   │   └── login/            # Page de connexion
│   ├── (admin)/              # Back-office admin
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── organisations/
│   │       ├── catalog-formations/
│   │       ├── missions/
│   │       ├── documents/
│   │       └── settings/
│   ├── (portal)/             # Portail client
│   │   └── portal/
│   │       ├── dashboard/
│   │       ├── personnel/
│   │       ├── formations/
│   │       ├── documents/
│   │       └── profile/
│   └── api/
│       ├── auth/             # Magic link auth
│       ├── documents/         # Upload/download
│       └── missions/          # Gestion missions
├── components/
│   ├── ui/                    # Composants UI de base
│   ├── marketing/             # Composants marketing
│   ├── admin/                 # Composants admin
│   └── portal/                # Composants portail
├── lib/
│   ├── auth/                  # Authentification
│   ├── access.ts              # RBAC + tenant checks
│   ├── db.ts                  # Prisma Client
│   ├── storage/               # Storage abstraction (local/S3)
│   ├── validators.ts          # Zod schemas
│   └── config.ts              # Configuration
├── prisma/
│   ├── schema.prisma          # Schéma Prisma
│   └── seed.ts                # Script de seed
└── uploads/                   # Stockage local (dev only)
```

## 🗄️ Base de Données

### Modèles Principaux

- **Organisation** : Entreprises clientes (tenants)
- **AdminUser** : Administrateurs
- **ClientUser** : Utilisateurs clients (liés à une organisation)
- **FormationCatalog** : Catalogue des formations disponibles
- **Mission** : Formations vendues à une organisation
- **Personnel** : Répertoire du personnel par organisation
- **MissionParticipant** : Affectation personnel → mission
- **Document** : Documents classés par mission
- **AuditLog** : Traçabilité RGPD

## 🔐 Authentification

### Magic Link

1. Utilisateur saisit son email sur `/login`
2. Vérification dans `AdminUser` ou `ClientUser`
3. Génération token (hash SHA256 stocké en DB)
4. Expiration : 15 minutes
5. **DEV** : URL loggée en console
6. **PROD** : Email envoyé via Resend
7. Clic sur lien → vérification → création session JWT → cookie httpOnly
8. Redirection selon rôle :
   - `ADMIN` → `/admin/dashboard`
   - `CLIENT` → `/portal/dashboard`

### Middleware

- `/admin/*` : Réservé aux `ADMIN`
- `/portal/*` : Réservé aux `CLIENT`
- `/login` : Public

## 📝 Installation

### Prérequis

- Node.js 18+
- PostgreSQL
- npm ou yarn

### Étapes

1. **Cloner et installer les dépendances**

```bash
npm install
```

2. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/eveil_etoiles?schema=public"

# Auth
JWT_SECRET="votre-secret-jwt-minimum-32-caracteres"
MAGIC_LINK_BASE_URL="http://localhost:3000"

# Email (Production - Resend)
RESEND_API_KEY=""
FROM_EMAIL="noreply@example.com"

# Storage (Production - S3 compatible)
# Si ces variables sont présentes, utilise S3, sinon stockage local (dev)
S3_ENDPOINT=""
S3_REGION=""
S3_BUCKET=""
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""

# Admin emails (optionnel, pour fallback)
ADMIN_EMAILS="admin@example.com"
```

3. **Créer la base de données**

```bash
# Générer le client Prisma
npm run db:generate

# Créer les migrations
npm run db:migrate

# Seed la base de données
npm run db:seed
```

4. **Lancer le serveur de développement**

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 🧪 Comptes de Test (après seed)

- **Admin** : `admin@example.com`
- **Client** : `client@example.com`

En développement, les liens de connexion apparaissent dans la console du serveur.

## 📦 Scripts Disponibles

- `npm run dev` : Serveur de développement
- `npm run build` : Build de production
- `npm run start` : Serveur de production
- `npm run db:migrate` : Créer/mettre à jour les migrations
- `npm run db:generate` : Générer le client Prisma
- `npm run db:seed` : Exécuter le seed
- `npm run db:studio` : Ouvrir Prisma Studio

## 🔒 Sécurité

- **RBAC** : Contrôle d'accès par rôle (ADMIN/CLIENT)
- **Tenant isolation** : Les clients ne voient que leur organisation
- **Sessions JWT** : Cookies httpOnly, SameSite=lax
- **Magic links** : Tokens hashés, expiration 15 min
- **Audit logs** : Traçabilité minimale (RGPD)

## 📤 Stockage des Fichiers

### Développement

Fichiers stockés localement dans `./uploads/`

### Production

Si les variables `S3_*` sont configurées, utilise S3 compatible (AWS S3, MinIO, etc.)

**Note Vercel** : Vercel a des limites sur le système de fichiers. Pour la production, configurez S3 ou utilisez Vercel Blob Storage.

## 🚀 Déploiement

### Vercel

1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer

**Important** : Configurez `S3_*` ou utilisez Vercel Blob Storage pour les uploads en production.

## 📚 Fonctionnalités

### Portail Client

- Dashboard avec statistiques
- Gestion du personnel (CRUD)
- Liste des formations (missions)
- Détail formation : affectation personnel, upload documents, téléchargement attestations
- Vue globale des documents
- Profil organisation

### Admin

- Dashboard avec statistiques
- Gestion des organisations (CRUD)
- Gestion des utilisateurs clients
- Catalogue formations (CRUD)
- Gestion des missions (formations vendues)
- Upload attestations et documents OPCO
- Clôture des formations
- Vue globale des documents

## 🐛 Dépannage

### Erreur de connexion à la base de données

Vérifiez que PostgreSQL est démarré et que `DATABASE_URL` est correct.

### Magic link ne fonctionne pas

En développement, vérifiez la console du serveur pour voir le lien généré.

### Uploads ne fonctionnent pas

En production, configurez les variables S3 ou utilisez Vercel Blob Storage.

## 📄 Licence

Propriétaire - Tous droits réservés
