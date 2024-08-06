import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPristma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPristma) {
    global.cachedPristma = new PrismaClient();
  }
  prisma = global.cachedPristma;
}

export const db = prisma;
