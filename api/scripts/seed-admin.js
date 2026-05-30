require('dotenv/config');

const { PrismaClient, Role } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { pbkdf2Sync, randomBytes } = require('crypto');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString(
    'hex',
  );

  return `${salt}:${hash}`;
}

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'admin@mail.com').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'secret123';
  const name = (process.env.ADMIN_NAME || 'Admin PeduliBersama').trim();

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set');
  }

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      password: hashPassword(password),
      role: Role.ADMIN,
    },
    create: {
      name,
      email,
      password: hashPassword(password),
      role: Role.ADMIN,
    },
  });

  console.log(`Admin ready: ${user.email} (${user.role})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
