"use server";
import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface CreateBookingParams {
  user_id: string;
  service_id: string;
  date: Date;
}

export const createBooking = async (params: CreateBookingParams) => {
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
