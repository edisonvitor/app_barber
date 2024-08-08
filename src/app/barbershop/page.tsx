import BarberShopItem from "../_components/barber-shop-item";
import Header from "../_components/Header";
import NameTitle from "../_components/NameTitle";
import SearchItem from "../_components/SearchItem";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
    search: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        { name: { contains: searchParams.search, mode: "insensitive" } },
        { description: { contains: searchParams.search, mode: "insensitive" } },
        {
          services: {
            some: {
              name: { contains: searchParams.search, mode: "insensitive" },
            },
          },
        },
      ],
    },
    take: 5,
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <Header />
      <div className="p-6">
        <NameTitle />
        <div className="mt-6">
          <SearchItem />
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          resultados para {searchParams.search}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopsPage;
