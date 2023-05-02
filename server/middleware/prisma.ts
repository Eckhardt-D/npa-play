import { PrismaClient } from "@prisma/client";

declare module "h3" {
  interface H3EventContext {
    prisma: PrismaClient;
  }
}

let prisma: PrismaClient;

export default defineEventHandler(async (event) => {
  prisma ??= new PrismaClient();
  event.context.prisma = prisma;
});
