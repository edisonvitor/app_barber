"use client";

import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import HamburgerMenu from "./Hamburger-menu";
import Link from "next/link";
import {
  CalendarIcon,
  HomeIcon,
  LogIn,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";
import LoginDialogGoogle from "./LoginDialogGoogle";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const Header = () => {
  const { data } = useSession();
  const handleSingOut = () => signOut();

  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image
            src="/Logo.svg"
            alt="BarberShop Logo"
            width={120}
            height={18}
          />
        </Link>
        <div className="lg:hidden">
          <HamburgerMenu />
        </div>
        <div className="hidden items-center space-x-4 lg:flex">
          {!data?.user ? (
            <>
              <h2 className="font-bold">Ola, faça seu login!</h2>
              <LoginDialogGoogle
                triggerContent={
                  <Button size="default" className="flex gap-2">
                    Login
                    <LogInIcon />
                  </Button>
                }
              />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button className="justify-start gap-2" variant="ghost" asChild>
                <Link href="/">
                  <HomeIcon size={18} />
                  Inicio
                </Link>
              </Button>
              <Button className="justify-start gap-2" variant="ghost" asChild>
                <Link href="/bookings">
                  <CalendarIcon size={18} />
                  Agendamentos
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={handleSingOut}
              >
                <LogOutIcon size={18} />
                Sair da Conta
              </Button>
              <Avatar className="w-11">
                <AvatarImage
                  src={data?.user?.image || ""}
                  loading="lazy"
                  className="rounded-full"
                />
              </Avatar>
              <div>
                <p className="font-bold">{data?.user?.name}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
