import { config } from "dotenv";
import { hash } from "argon2";
import { PrismaClient } from "@prisma/client";

config();

const prisma = new PrismaClient();

async function seed() {
  const exists = await prisma.user.findFirst({
    where: {
      email: "test@test.com",
    },
  });

  if (exists) {
    return;
  }

  await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "Test",
      password: await hash("test"),
      posts: {
        create: [
          {
            content: "This is an example posting.",
          },
        ],
      },
    },
  });
}

await seed().then(() => {
  console.log(`🌱 Seeding completed`);
});
