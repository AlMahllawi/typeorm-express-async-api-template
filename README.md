# TypeORM Express Postgres Async API Template
A minimal TypeORM, Express, and PostgreSQL template for building async REST APIs with ESM.  
Featuring entity definitions, migrations, and tsx for TypeScript execution.  
Checkout [contributing](./CONTRIBUTING.md#development-setup).

## Prerequisites
- [Node.js v20+](https://nodejs.org/en)
- [PNPM](https://pnpm.io/)

## Quick Start

### Install dependencies
```bash
pnpm install --prod
```

### Set up the environment
```bash
cp example.env .env
```

Edit the [database connection URL](https://stackoverflow.com/questions/3582552/what-is-the-format-for-the-postgresql-connection-string-url) in `.env` e.g.:
```env
DB_CONNECTION_URL="postgres://almahllawi:n0nS3cure@localhost:5432/AppDatabase"
```

### Run the migrations
```bash
pnpm migrations
```

### Build the API
```bash
pnpm build
```

### Launch the API
```bash
pnpm start
```