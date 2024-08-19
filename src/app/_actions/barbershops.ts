import { Barbershop } from "@prisma/client";
import { db } from "../_lib/prisma";

export async function getBarbershops(): Promise<Barbershop[]> {
  try {
    return await db.barbershop.findMany({});
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPopularBarbershops(): Promise<Barbershop[]> {
  try {
    return await db.barbershop.findMany({
      orderBy: {
        name: "desc",
      },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
