import Image from "next/image";
import Header from "./_components/Header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import { SearchIcon } from "lucide-react";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/barber-shop-item";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({});

  return (
    <div>
      <Header />
      <div className="p-6">
        <div>
          <h2 className="text-xl font-bold">Ola, Miguel!</h2>
          <p>Terça, 6 de Agosto</p>
          <div className="mt-6 flex items-center gap-2">
            <Input placeholder="Buscar..." />
            <Button>
              <SearchIcon />
            </Button>
          </div>
          <div className="relative mt-6 h-[150px] w-full">
            <Image
              alt="Agende nos melhores com FWS Barber"
              fill
              className="rounded-xl object-cover"
              src="/banner.png"
            />
          </div>
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge>Confirmado</Badge>
              <h3 className="text-xl font-semibold">Corte de cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Vintage Barber</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">06</p>
              <p className="text-sm">14:00</p>
            </div>
          </CardContent>
        </Card>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          agendamentos
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
