# getting started

```
git clone https://github.com/Eckhardt-D/npa-play.git
```

# Run install

```
cd npa-play && pnpm install
```

# Copy .env

```
cp .env.example .env
```

> Remember to update the values

# Run Prisma commands

```
npx prisma migrate dev && npx prisma generate
```

# Seed the database for example to work

```
pnpm run seed
```

# Start the app

```
pnpm dev
```

# Notes

This uses sqlite for ease, but can replace with any prisma supported DB