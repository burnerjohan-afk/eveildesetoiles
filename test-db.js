// Script de test pour vérifier la connexion à la base de données
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie !');
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

test();
