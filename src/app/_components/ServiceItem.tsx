"use client";
import { Barbershop, Barbershop_service, Booking } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { useEffect, useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { addDays, format, isPast, isToday, set } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import LoginDialogGoogle from "./LoginDialogGoogle";
import { LogIn } from "lucide-react";
import { getBookings } from "../_actions/get-bookings";
import { error } from "console";

interface ServiceItemProps {
  service: Barbershop_service;
  barbershop: Pick<Barbershop, "name">;
}

//pega os agendamentos no db

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

interface getTimeListProps {
  bookings: Booking[];
  selectedDay: Date;
}

const getTimeList = ({ bookings, selectedDay }: getTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const [hour, minutes] = time.split(":").map(Number);

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }));
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false;
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    );

    if (hasBookingOnCurrentTime) {
      return false;
    }
    return true;
  });
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const handleDate = (): Date | undefined => {
    if (!selectedDay || !selectedTime) return;
    const [hour, minute] = selectedTime.split(":").map(Number);
    return set(selectedDay, {
      minutes: minute,
      hours: hour,
    });
  };

  const handleBookingSheet = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
  };

  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  useEffect(() => {
    const fetchBookings = async () => {
      if (!selectedDay) return;
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetchBookings();
  }, [selectedDay, service.id, setDayBookings]);

  const handleCreateBooking = async () => {
    try {
      const newDate = handleDate();
      if (!newDate) {
        toast.error("Por favor, escolha um horário válido");
        return;
      }

      await createBooking({
        service_id: service.id,
        user_id: (data?.user as any).id,
        date: newDate,
      });
      toast.success("Reserva realizada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Error ao criar Reserva");
    }
  };

  const timeList = useMemo(() => {
    if (!selectedDay) return [];
    return getTimeList({ bookings: dayBookings, selectedDay });
  }, [dayBookings, selectedDay]);

  return (
    <Card>
      <CardContent className="flex items-center gap-2 p-2">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            alt={service.name}
            fill
            className="rounded-lg object-cover"
            src={service.image_url}
          />
        </div>
        <div className="w-full space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Sheet onOpenChange={handleBookingSheet}>
              <SheetTrigger>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-auto p-0 [&::-webkit-scrollbar]:hidden">
                <SheetTitle className="border-b border-solid p-6">
                  Fazer Reserva
                </SheetTitle>
                <div className="border-b border-solid py-5">
                  <Calendar
                    mode="single"
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    locale={ptBR}
                    fromDate={new Date()}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>
                {selectedDay && (
                  <div className="flex gap-2 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                    {timeList.length > 0 ? (
                      timeList.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          size="sm"
                          className="rounded-full"
                          onClick={() => {
                            setSelectedTime(time);
                          }}
                        >
                          {time}
                        </Button>
                      ))
                    ) : (
                      <p className="text-center text-sm">
                        Não há horários disponíveis nesse dia
                      </p>
                    )}
                  </div>
                )}
                {selectedDay && selectedTime && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold text-gray-400">Data</h2>
                          <p className="text-sm">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold text-gray-400">Horário</h2>
                          <p className="text-sm">{selectedTime}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold text-gray-400">Barbearia</h2>
                          <p className="text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className="mx-5 mt-5">
                  {!data?.user ? (
                    <LoginDialogGoogle
                      triggerContent={
                        <Button
                          variant="default"
                          size="lg"
                          className="w-full"
                          onClick={handleCreateBooking}
                        >
                          Fazer Login
                        </Button>
                      }
                    />
                  ) : (
                    <SheetClose>
                      <Button
                        disabled={!selectedDay || !selectedTime}
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={handleCreateBooking}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  )}
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
