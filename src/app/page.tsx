import Image from "next/image";
import Header from "./_components/Header";
import { Button } from "./_components/ui/button";
import BarberShopItem from "./_components/barber-shop-item";
import quickSearchOptions from "./_constance/search";
import BulkingItem from "./_components/Bulking-tem";
import NameTitle from "./_components/NameTitle";
import SearchItem from "./_components/SearchItem";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { getBarbershops, getPopularBarbershops } from "./_actions/barbershops";
import { getBookingsByStatus } from "./_actions/bookings";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const barbershops = await getBarbershops();
  const popularBarbershops = await getPopularBarbershops();
  const bookings = session?.user
    ? await getBookingsByStatus({
        userId: (session.user as any).id,
        status: "confirmado",
        date: undefined,
        serviceId: "",
      })
    : [];

  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="mb-3">
          <NameTitle />
          <div className="mt-6">
            <SearchItem />
          </div>
          <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {quickSearchOptions.map((option) => (
              <Button
                key={option.title}
                className="gap-2"
                variant="secondary"
                asChild
              >
                <Link href={`/barbershop?search=${option.title}`}>
                  <Image
                    alt={option.title}
                    src={option.imageUrl}
                    width={16}
                    height={16}
                  />
                  {option.title}
                </Link>
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
        {bookings.length > 0 && (
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            agendamentos
          </h2>
        )}
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {bookings.map((booking) => (
            <BulkingItem key={booking.id} booking={booking} />
          ))}
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          barbearias
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
