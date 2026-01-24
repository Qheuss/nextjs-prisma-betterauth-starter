# 🚀 Next.js Starter with Better Auth & Prisma

A modern and production-ready starter to quickly launch your Next.js projects with complete authentication.

[FR explanations](./readmefr.md)

## ✨ Features

- **Next.js 16** with App Router and Turbopack
- **Better Auth** - Modern authentication with:
  - Email & password registration/login
  - Email verification
  - Password reset
  - Role management (admin/user)
  - Secure sessions
  - CSRF protection
- **Prisma** - Type-safe ORM with migrations
- **TypeScript** - Complete type safety
- **Tailwind CSS 4** - Modern styling
- **PostgreSQL** - Relational database
- **React Compiler** - Automatic optimizations

## 📋 Prerequisites

- **Node.js** 18+ or Bun
- **pnpm** (or npm/yarn)
- **PostgreSQL** (local or remote)
- **Docker** (optional, for local PostgreSQL)

## 🎯 Installation

### 1. Clone and install dependencies

```bash
git clone <your-repo>
cd newproject
pnpm install
```

### 2. Configure the database

**Option A: Local PostgreSQL with Docker**

```bash
docker run -d \
  --name newprojectdb \
  -e POSTGRES_USER=postgresuser \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=newprojectdb \
  -p 5432:5432 \
  postgres:latest
```

**Option B: Existing database**

Use your own PostgreSQL instance.

### 3. Configure environment variables

Copy the example file and modify the values:

```bash
cp example.env .env
```

Edit `.env`:

```bash
# Database
DATABASE_URL="postgresql://postgresuser:password@localhost:5432/newprojectdb"

# Better Auth - Generate a secure secret
BETTER_AUTH_SECRET="your-secret-generated-with-openssl"

# Application URL
BETTER_AUTH_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

**Generate a secure secret:**

```bash
openssl rand -base64 32
```

### 4. Initialize the database

```bash
pnpm prisma migrate dev
```

This command:

- Creates tables in your database
- Generates the typed Prisma client
- Applies all migrations

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project structure

```
newproject/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Migration history
├── src/
│   ├── app/                   # Next.js routes (App Router)
│   │   ├── page.tsx          # Home page
│   │   ├── login/            # Login page
│   │   ├── flow/             # Protected page (example)
│   │   └── api/auth/         # Better Auth endpoints
│   ├── auth/
│   │   └── permissions.ts    # Role configuration
│   ├── lib/
│   │   ├── auth.ts           # Better Auth configuration
│   │   ├── auth-client.ts    # Better Auth client (React)
│   │   ├── prisma.ts         # Prisma instance
│   │   └── email.ts          # Email sending service
│   ├── utils/
│   │   └── sessionWithHeaders.ts  # Helper for server-side sessions
│   └── env.ts                # Environment variables validation (Zod)
└── package.json
```

## 🔐 Authentication

### Available pages

- `/login` - Registration and login
- `/flow` - Protected page (example)

### Client-side usage

```tsx
'use client';
import { signIn, signUp, signOut, useSession } from '@/lib/auth-client';

export default function MyComponent() {
  const { data: session } = useSession();

  // Registration
  await signUp.email({
    email: 'user@example.com',
    password: 'securepassword',
    name: 'John Doe',
  });

  // Login
  await signIn.email({
    email: 'user@example.com',
    password: 'securepassword',
  });

  // Logout
  await signOut();
}
```

### Server-side usage

```tsx
import { sessionWithHeaders } from '@/utils/sessionWithHeaders';

export default async function ServerPage() {
  const session = await sessionWithHeaders();

  if (!session) {
    redirect('/login');
  }

  return <div>Hello {session.user.name}</div>;
}
```

## 📦 Available commands

```bash
# Development
pnpm dev                    # Start dev server with Turbopack

# Build
pnpm build                  # Production build
pnpm start                  # Start production server

# Database
pnpm prisma migrate dev     # Create and apply migration
pnpm prisma studio          # Visual database interface
pnpm prisma generate        # Generate Prisma client

# Better Auth
npx @better-auth/cli generate  # Generate types after adding plugins

# Linting
pnpm lint                   # Check code with ESLint
```

## 🎨 Customization

### Add Prisma models

1. Modify `prisma/schema.prisma`
2. Create a migration: `pnpm prisma migrate dev --name description`
3. The Prisma client will be automatically regenerated

### Add Better Auth plugins

Better Auth offers many plugins: OAuth (Google, GitHub, etc.), 2FA, etc.

```bash
# Install a plugin
pnpm add @better-auth/plugin-name

# Generate types
npx @better-auth/cli generate
```

See [Better Auth documentation](https://www.better-auth.com/docs/plugins/overview).

### Email configuration

Currently, the email service is a placeholder in `src/lib/email.ts`.

Integrate a service such as:

- **Resend** (recommended)
- **SendGrid**
- **Mailgun**
- **AWS SES**

## 🔒 Production

### Environment variables

In production, configure:

```bash
DATABASE_URL="your-production-url"
BETTER_AUTH_SECRET="long-and-random-secret"
BETTER_AUTH_URL="https://yourdomain.com"
NODE_ENV="production"
```

### Security

- ✅ CSRF protection active in production
- ✅ Secure sessions
- ✅ Passwords hashed with bcrypt
- ✅ Environment variables validated with Zod
- ⚠️ Configure your email service for production
- ⚠️ Use HTTPS in production

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or a PR.

## 📄 License

MIT

---

**Start your project in 5 minutes** 🚀
