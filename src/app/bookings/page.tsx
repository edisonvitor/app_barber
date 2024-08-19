import { getServerSession } from "next-auth";
import Header from "../_components/Header";
import { authOptions } from "../_lib/auth";
import BulkingItem from "../_components/Bulking-tem";
import { db } from "../_lib/prisma";
import { getBookingsByStatus } from "../_actions/bookings";

const Bookings = async () => {
  const session = await getServerSession(authOptions);
  // valida se o usuario existe
  if (!session?.user) {
    return <p>Você não está logado!</p>;
  }
  const bookingsConfirmados = await getBookingsByStatus({
    userId: (session?.user as any).id,
    status: "confirmado",
    serviceId: "",
  });
  const bookingsFinalizados = await getBookingsByStatus({
    userId: (session?.user as any).id,
    status: "finalizado",
    serviceId: "",
  });

  return (
    <>
      <Header />
      {/* Renderiza os bookings */}
      <div className="space-y-3 p-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Confirmados
        </h2>
        {bookingsConfirmados.map((booking) => (
          <BulkingItem key={booking.id} booking={booking} />
        ))}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Finalizados
        </h2>
        {bookingsFinalizados.map((booking) => (
          <BulkingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  );
};

export default Bookings;
