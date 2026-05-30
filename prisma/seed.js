const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.certificate.deleteMany({ where: { isTemplate: true } });
  console.log("Old templates cleared.");

  for (let i = 1; i <= 29; i++) {
    await prisma.certificate.create({
      data: {
        recipient: `Sertifikat Shabloni ${i}`,
        issuer: `Tayyor Dizayn ${i}`,
        templateUrl: `/templates/sertifikatlar/${i}-t.png`,
        isTemplate: true,
        elementsData: JSON.stringify([]),  // empty - user will fill in specific fields
        qrCodeUrl: ""
      }
    });
  }

  console.log("✅ 29 ta haqiqiy shablon (bo'sh elementlar bilan) muvaffaqiyatli qo'shildi!");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());
