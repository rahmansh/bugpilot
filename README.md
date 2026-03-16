# BugPilot

A modern bug tracking application built with a monorepo architecture.

## Project Structure

```
bugpilot/
├── apps/
│   ├── client/          # React + Vite frontend
│   └── server/          # Express backend API
├── packages/
│   └── shared/          # Shared TypeScript types
├── package.json         # Root workspace configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

Install all dependencies from the root:

```bash
npm install
```

This will install dependencies for all workspaces (client, server, and shared).

### Development

Run both client and server in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Run only the client (http://localhost:3000)
npm run dev:client

# Run only the server (http://localhost:5001)
npm run dev:server
```

### Building

Build both applications:

```bash
npm run build
```

Or build separately:

```bash
npm run build:client
npm run build:server
```

## Workspaces

### Client (`apps/client`)

- Framework: React 18
- Build Tool: Vite
- Port: 3000

### Server (`apps/server`)

- Framework: Express
- Runtime: Node.js with TypeScript
- Port: 5001

### Shared (`packages/shared`)

Contains shared TypeScript types and interfaces used by both client and server.

**Example usage:**

```typescript
// In client or server
import { Bug, User } from '@bugpilot/shared'
```

## Why Monorepo?

This project uses a monorepo structure because:

1. **Shared types**: The Bug, User, and other interfaces are used by both frontend and backend
2. **Single source of truth**: No type duplication or drift
3. **Coordinated changes**: Update types in one place, use everywhere
4. **Better DX**: Install once, run all apps with single commands

## Adding Dependencies

**For the client:**
```bash
npm install <package> --workspace=apps/client
```

**For the server:**
```bash
npm install <package> --workspace=apps/server
```

**For shared:**
```bash
npm install <package> --workspace=packages/shared
```

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Shared**: TypeScript
- **Package Manager**: npm workspaces

## License

MIT
