"use server";

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface GetBookingsProps {
  date?: Date;
  serviceId?: string;
  userId?: string;
  status?: string;
}

export const getBookings = ({ serviceId, date }: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date!),
        gte: startOfDay(date!),
      },
    },
  });
};

export const getAllBookings = async ({ userId, status }: GetBookingsProps) => {
  const now = new Date();
  return await db.booking.findMany({
    where: {
      user: { id: userId },
      AND: [
        status === "finalizado"
          ? { date: { lte: now } }
          : status === "confirmado"
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
    orderBy: status === "confirmado" ? [{ date: "asc" }] : [{ date: "desc" }],
  });
};
