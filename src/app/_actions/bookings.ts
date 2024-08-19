"use server";
import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { endOfDay, startOfDay } from "date-fns";

interface CreateBookingParams {
  userId: string;
  serviceId: string;
  date: Date;
}
interface deleteBookingParams {
  bookingId: string;
  userId: string;
}
interface GetBookingsProps {
  date?: Date;
  serviceId: string;
  userId: string;
  status: string;
}

async function verifyUser(
  params: CreateBookingParams | deleteBookingParams | GetBookingsProps,
) {
  const user = await getServerSession(authOptions);
  if (!user) {
    throw new Error("Usuario não autenticado!");
  }
  if ((user.user as any).id != params.userId) {
    throw new Error("Você não pode fazer este booking!");
  }
  return true;
}

export async function getBookings(props: GetBookingsProps) {
  await verifyUser(props);
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(props.date!),
        gte: startOfDay(props.date!),
      },
    },
  });
}

export const getBookingsByStatus = async (props: GetBookingsProps) => {
  await verifyUser(props);

  const now = new Date();
  return await db.booking.findMany({
    where: {
      user: { id: props.userId },
      AND: [
        props.status === "finalizado"
          ? { date: { lte: now } }
          : props.status === "confirmado"
            ? { date: { gte: now } }
            : {},
      ],
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    // se status = confirmado ordena por data ascendente, senão descendente
    orderBy:
      props.status === "confirmado" ? [{ date: "asc" }] : [{ date: "desc" }],
  });
};

export async function createBooking(params: CreateBookingParams) {
  await verifyUser(params);
  await db.booking.create({
    data: {
      user: { connect: { id: params.userId } },
      service: { connect: { id: params.serviceId } },
      date: params.date,
    },
  });
  revalidatePath("/barbershop/[id]");
  return { message: "Booking created successfully" };
}

export async function deleteBooking(params: deleteBookingParams) {
  await verifyUser(params);
  const booking = await db.booking.findUnique({
    where: {
      id: params.bookingId,
    },
  });
  if (!booking) {
    throw new Error("Booking não encontrado!");
  }
  await db.booking.delete({
    where: {
      id: params.bookingId,
    },
  });
  revalidatePath("/bookings");
}
