import Image from "next/image";
import Header from "./_components/Header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import { SearchIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/barber-shop-item";
import quickSearchOptions from "./_constance/search";
import BulkingItem from "./_components/Bulking-tem";
import Footer from "./_components/Footer";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

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
          <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {quickSearchOptions.map((option) => (
              <Button key={option.title} className="gap-2" variant="secondary">
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  width={16}
                  height={16}
                />
                {option.title}
              </Button>
            ))}
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
        <BulkingItem />
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          agendamentos
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
