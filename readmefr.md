# 🚀 Next.js Starter avec Better Auth & Prisma

Un starter moderne et production-ready pour démarrer rapidement vos projets Next.js avec une authentification complète.

[EN explanations](./README.md)

## ✨ Fonctionnalités

- **Next.js 16** avec App Router et Turbopack
- **Better Auth** - Authentification moderne avec:
  - Inscription/connexion par email & mot de passe
  - Vérification d'email
  - Réinitialisation de mot de passe
  - Gestion des rôles (admin/user)
  - Sessions sécurisées
  - Protection CSRF
- **Prisma** - ORM type-safe avec migrations
- **TypeScript** - Type safety complète
- **Tailwind CSS 4** - Styling moderne
- **PostgreSQL** - Base de données relationnelle
- **React Compiler** - Optimisations automatiques

## 📋 Prérequis

- **Node.js** 18+ ou Bun
- **pnpm** (ou npm/yarn)
- **PostgreSQL** (local ou distant)
- **Docker** (optionnel, pour PostgreSQL local)

## 🎯 Installation

### 1. Cloner et installer les dépendances

```bash
git clone <votre-repo>
cd newproject
pnpm install
```

### 2. Configurer la base de données

**Option A: PostgreSQL local avec Docker**

```bash
docker run -d \
  --name newprojectdb \
  -e POSTGRES_USER=postgresuser \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=newprojectdb \
  -p 5432:5432 \
  postgres:latest
```

**Option B: Base de données existante**

Utilisez votre propre instance PostgreSQL.

### 3. Configurer les variables d'environnement

Copiez le fichier d'exemple et modifiez les valeurs:

```bash
cp example.env .env
```

Éditez `.env`:

```bash
# Base de données
DATABASE_URL="postgresql://postgresuser:password@localhost:5432/newprojectdb"

# Better Auth - Générez un secret sécurisé
BETTER_AUTH_SECRET="votre-secret-genere-avec-openssl"

# URL de l'application
BETTER_AUTH_URL="http://localhost:3000"

# Environnement
NODE_ENV="development"
```

**Générer un secret sécurisé:**

```bash
openssl rand -base64 32
```

### 4. Initialiser la base de données

```bash
pnpm prisma migrate dev
```

Cette commande:

- Crée les tables dans votre base de données
- Génère le client Prisma typé
- Applique toutes les migrations

### 5. Lancer le serveur de développement

```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🗂️ Structure du projet

```
newproject/
├── prisma/
│   ├── schema.prisma          # Schéma de la base de données
│   └── migrations/            # Historique des migrations
├── src/
│   ├── app/                   # Routes Next.js (App Router)
│   │   ├── page.tsx          # Page d'accueil
│   │   ├── login/            # Page de connexion
│   │   ├── hub/              # Page protégée (exemple)
│   │   └── api/auth/         # Endpoints Better Auth
│   ├── auth/
│   │   └── permissions.ts    # Configuration des rôles
│   ├── lib/
│   │   ├── auth.ts           # Configuration Better Auth
│   │   ├── auth-client.ts    # Client Better Auth (React)
│   │   ├── prisma.ts         # Instance Prisma
│   │   └── email.ts          # Service d'envoi d'emails
│   ├── utils/
│   │   └── sessionWithHeaders.ts  # Helper pour les sessions server-side
│   └── env.ts                # Validation des variables d'environnement (Zod)
└── package.json
```

## 🔐 Authentification

### Pages disponibles

- `/login` - Inscription et connexion
- `/hub` - Page protégée (exemple)

### Utilisation côté client

```tsx
'use client';
import { signIn, signUp, signOut, useSession } from '@/lib/auth-client';

export default function MyComponent() {
  const { data: session } = useSession();

  // Inscription
  await signUp.email({
    email: 'user@example.com',
    password: 'securepassword',
    name: 'John Doe',
  });

  // Connexion
  await signIn.email({
    email: 'user@example.com',
    password: 'securepassword',
  });

  // Déconnexion
  await signOut();
}
```

### Utilisation côté serveur

```tsx
import { sessionWithHeaders } from '@/utils/sessionWithHeaders';

export default async function ServerPage() {
  const session = await sessionWithHeaders();

  if (!session) {
    redirect('/login');
  }

  return <div>Bonjour {session.user.name}</div>;
}
```

## 📦 Commandes disponibles

```bash
# Développement
pnpm dev                    # Lance le serveur de dev avec Turbopack

# Build
pnpm build                  # Build de production
pnpm start                  # Lance le serveur de production

# Base de données
pnpm prisma migrate dev     # Crée et applique une migration
pnpm prisma studio          # Interface visuelle pour la BD
pnpm prisma generate        # Génère le client Prisma

# Better Auth
npx @better-auth/cli generate  # Génère les types après ajout de plugins

# Linting
pnpm lint                   # Vérifie le code avec ESLint
```

## 🎨 Personnalisation

### Ajouter des modèles Prisma

1. Modifiez `prisma/schema.prisma`
2. Créez une migration: `pnpm prisma migrate dev --name description`
3. Le client Prisma sera automatiquement régénéré

### Ajouter des plugins Better Auth

Better Auth propose de nombreux plugins: OAuth (Google, GitHub, etc.), 2FA, etc.

```bash
# Installer un plugin
pnpm add @better-auth/plugin-name

# Générer les types
npx @better-auth/cli generate
```

Consultez la [documentation Better Auth](https://www.better-auth.com/docs/plugins/overview).

### Configuration de l'email

Actuellement, le service d'email est un placeholder dans `src/lib/email.ts`.

Intégrez un service comme:

- **Resend** (recommandé)
- **SendGrid**
- **Mailgun**
- **AWS SES**

## 🔒 Production

### Variables d'environnement

En production, configurez:

```bash
DATABASE_URL="votre-url-de-production"
BETTER_AUTH_SECRET="secret-long-et-aleatoire"
BETTER_AUTH_URL="https://votredomaine.com"
NODE_ENV="production"
```

### Sécurité

- ✅ CSRF protection active en production
- ✅ Sessions sécurisées
- ✅ Mots de passe hashés avec bcrypt
- ✅ Variables d'environnement validées avec Zod
- ⚠️ Configurez votre service d'email pour la production
- ⚠️ Utilisez HTTPS en production

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une PR.

## 📄 Licence

MIT

---

**Démarrez votre projet en 5 minutes** 🚀
