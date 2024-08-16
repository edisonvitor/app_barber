"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";

const NameTitle = () => {
  // Formata a data para o padrão dd/mm/aaaa
  const formattedDate = format(new Date(), "EEEE, dd 'de' MMMM", {
    locale: ptBR,
  });

  // Obtém os dados do usuário logado através do NextAuth
  const { data } = useSession();
  if (!data) {
    return (
      <>
        <h2 className="text-xl font-bold">Olá faça seu login!</h2>
        <p>{formattedDate}</p>
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold">Olá {data.user?.name}!</h2>
      <p className="capitalize">{formattedDate}</p>
    </>
  );
};

export default NameTitle;
