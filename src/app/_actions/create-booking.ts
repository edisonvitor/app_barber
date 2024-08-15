"use server";
import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

interface CreateBookingParams {
  user_id: string;
  service_id: string;
  date: Date;
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions);
  if (!user) {
    throw new Error("Usuario não autenticado!");
  }
  if ((user.user as any).id != params.user_id) {
    throw new Error("Você não pode fazer este booking!");
  }
  await db.booking.create({
    data: {
      user: { connect: { id: params.user_id } },
      service: { connect: { id: params.service_id } },
      date: params.date,
    },
  });
  revalidatePath("/barbershop/[id]");
  return { message: "Booking created successfully" };
};
