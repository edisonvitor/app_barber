"use client";

import { useSession } from "next-auth/react";

const NameTitle = () => {
  // obtem a data atual
  const currentDate = new Date();
  // Formata a data para o padrão dd/mm/aaaa
  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
  // Obtém os dados do usuário logado através do NextAuth
  const { data } = useSession();
  if (!data) {
    return (
      <>
        <h2 className="text-xl font-bold">Olá Faça seu login!</h2>
        <p>{formattedDate}</p>
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold">Olá {data.user?.name}!</h2>
      <p>{formattedDate}</p>
    </>
  );
};

export default NameTitle;
