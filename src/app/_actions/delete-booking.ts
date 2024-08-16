"use server";
import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

interface deleteBookingParams {
  bookingId: string;
  userId: string;
}

// deleta um booking
export const deleteBooking = async (params: deleteBookingParams) => {
  // verifica se o usuario recebido é valido
  const user = await getServerSession(authOptions);
  if (!user) {
    throw new Error("Usuario não autenticado!");
  }
  if ((user.user as any).id != params.userId) {
    throw new Error("Você não pode deletar este booking!");
  }
  // verifica se o booking existe
  const booking = await db.booking.findUnique({
    where: {
      id: params.bookingId,
    },
  });
  if (!booking) {
    throw new Error("Booking não encontrado!");
  }
  // deleta o booking
  await db.booking.delete({
    where: {
      id: params.bookingId,
    },
  });
  // revalida a cache
  revalidatePath("/bookings");
};
