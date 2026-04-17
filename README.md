# 📅 Event Planner

A premium, modern, and efficient platform for planning and managing your events. Track RSVPs, share invites, and organize your guests with a seamless experience.

## ✨ Features

- **Global Dark Theme**: Premium aesthetic with glassmorphism effects.
- **Event Management**: Create, update, and delete events with ease.
- **RSVP Tracking**: Real-time guest response tracking.
- **Secure Invites**: Unique tokens for every event to maintain privacy.
- **Unified Navigation**: Quick access to Dashboard, About, and Settings.
- **User Profiles**: Custom profiles to manage your identity.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Database**: [Neon Postgres](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Neon Auth](https://neon.tech/docs/guides/neon-auth)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/) icons

## 🛠️ Getting Started

### 1. Prerequisites

- Node.js installed on your machine.
- A Neon database account.

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/kavindidewmininavodya/event-planner

# Install dependencies
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Fill in your Neon database and auth credentials:

- `DATABASE_URL`: Your Neon Postgres connection string.
- `NEON_AUTH_BASE_URL`: Your Neon Auth base URL.
- `NEON_AUTH_COOKIE_SECRET`: A secure secret for auth cookies.

### 4. Database Setup

```bash
# Push the schema to the database
npx prisma db push

# Generate the Prisma client
npx prisma generate
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🔒 Security Best Practices for GitHub

When pushing this project to a public repository, ensure:
1. **Never commit your `.env` file**. It is already listed in `.gitignore`.
2. **Use `.env.example`** to share the required keys without their actual values.
3. If you accidentally committed credentials, rotate your API keys and database passwords immediately.

## 📄 License

This project is licensed under the MIT License.
