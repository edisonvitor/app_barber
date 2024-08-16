"use client";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./Phone-tem";
import { Button } from "./ui/button";
import { deleteBooking } from "../_actions/delete-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import BookingSummary from "./Booking-summary";

interface BulkingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const BulkingItem = ({ booking }: BulkingItemProps) => {
  const data = useSession();
  const isConfirmed = isFuture(booking.date);
  const {
    service: { barbershop },
  } = booking;

  const handleDelete = async () => {
    try {
      await deleteBooking({
        bookingId: booking.id,
        userId: (data.data?.user as any).id,
      });
      toast.success("Booking deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar Booking!");
    }
  };
  return (
    <Sheet>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="text-xl font-semibold">{booking.service.name}</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={barbershop.image_url} />
                </Avatar>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="relative mb-3 mt-6 flex h-[180px] w-full items-end">
          <Image
            alt={`mapa da barbearia ${barbershop.name}`}
            src="/map.png"
            fill
            className="rounded-xl object-cover"
          />
          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.image_url} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Badge
          className="w-fit"
          variant={isConfirmed ? "default" : "secondary"}
        >
          {isConfirmed ? "Confirmado" : "Finalizado"}
        </Badge>
        <div className="mb-5 mt-3">
          <BookingSummary
            barbershop={barbershop}
            service={booking.service}
            selectedDay={booking.date}
          />
        </div>
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
        <SheetFooter>
          <div className="mb-6 mt-3 flex justify-between gap-3">
            <SheetClose asChild>
              <Button className="w-full" variant="outline">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="destructive">
                    Cancelar Reserva
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancelar Reserva</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja cancelar esse agendamento?
                    </DialogDescription>
                    <DialogFooter className="flex flex-row gap-3">
                      <DialogClose asChild>
                        <Button className="w-full" variant="outline">
                          Voltar
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          className="w-full"
                          onClick={handleDelete}
                          variant="destructive"
                        >
                          Cancelar Reserva
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BulkingItem;
