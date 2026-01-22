import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

// Charger les variables d'environnement
config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed...");

  // 1. Créer un admin
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
    },
  });
  console.log("✅ Admin créé:", admin.email);

  // 2. Créer une organisation
  let organisation = await prisma.organisation.findFirst({
    where: { name: "Crèche Les Petits Loups" },
  });

  if (!organisation) {
    organisation = await prisma.organisation.create({
      data: {
        name: "Crèche Les Petits Loups",
        address: "123 Rue de la République, 75001 Paris",
        opcoInfo: "OPCO 2i",
      },
    });
  }
  console.log("✅ Organisation créée:", organisation.name);

  // 3. Créer un client user
  const clientUser = await prisma.clientUser.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      name: "Marie Dupont",
      organisationId: organisation.id,
    },
  });
  console.log("✅ Client user créé:", clientUser.email);

  // 4. Créer une formation catalog
  let formationCatalog = await prisma.formationCatalog.findUnique({
    where: { slug: "gestion-equipe-creche" },
  });

  if (!formationCatalog) {
    formationCatalog = await prisma.formationCatalog.create({
      data: {
        slug: "gestion-equipe-creche",
        title: "Gestion d'équipe en crèche",
        description: "Formation complète sur la gestion d'équipe dans les structures de petite enfance",
        isActive: true,
      },
    });
  }
  console.log("✅ Formation catalog créée:", formationCatalog.title);

  // 5. Créer une mission (formation vendue)
  const mission = await prisma.mission.create({
    data: {
      organisationId: organisation.id,
      formationCatalogId: formationCatalog.id,
      status: "IN_PROGRESS",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 jours
    },
  });
  console.log("✅ Mission créée:", mission.id);

  // 6. Créer du personnel
  const personnel1 = await prisma.personnel.create({
    data: {
      organisationId: organisation.id,
      firstName: "Sophie",
      lastName: "Martin",
      position: "Directrice",
      email: "sophie.martin@creche.fr",
      phone: "06 12 34 56 78",
    },
  });

  const personnel2 = await prisma.personnel.create({
    data: {
      organisationId: organisation.id,
      firstName: "Jean",
      lastName: "Dupont",
      position: "Éducateur",
      email: "jean.dupont@creche.fr",
    },
  });
  console.log("✅ Personnel créé: 2 personnes");

  // 7. Affecter du personnel à la mission
  await prisma.missionParticipant.createMany({
    data: [
      {
        missionId: mission.id,
        personnelId: personnel1.id,
      },
      {
        missionId: mission.id,
        personnelId: personnel2.id,
      },
    ],
  });
  console.log("✅ Participants affectés à la mission");

  console.log("\n🎉 Seed terminé avec succès !");
  console.log("\n📧 Comptes de test:");
  console.log("   Admin: admin@example.com");
  console.log("   Client: client@example.com");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
