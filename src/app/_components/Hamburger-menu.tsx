"use client";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import quickSearchOptions from "../_constance/search";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import LoginDialogGoogle from "./LoginDialogGoogle";

const HamburgerMenu = () => {
  const { data } = useSession();
  const handleSingOut = () => signOut();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          {!data?.user ? (
            <>
              <h2 className="font-bold">Ola, faça seu login!</h2>
              <LoginDialogGoogle
                triggerContent={
                  <Button size="icon">
                    <LogInIcon />
                  </Button>
                }
              />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.user?.image || ""} />
              </Avatar>
              <div>
                <p className="font-bold">{data?.user?.name}</p>
                <p className="text-sm">{data?.user?.email}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <SheetClose asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href="/">
                <HomeIcon size={18} />
                Inicio
              </Link>
            </Button>
          </SheetClose>
          <Button className="justify-start gap-2" variant="ghost">
            <CalendarIcon size={18} />
            Agendamentos
          </Button>
        </div>
        <div className="flex flex-col gap-2 border-b border-solid py-5">
          {quickSearchOptions.map((option) => (
            <SheetClose asChild key={option.title}>
              <SheetClose asChild>
                <Button className="justify-start gap-2" variant="ghost" asChild>
                  <Link href={`/barbershop?search=${option.title}`}>
                    <Image
                      alt={option.title}
                      src={option.imageUrl}
                      height={18}
                      width={18}
                    />
                    {option.title}
                  </Link>
                </Button>
              </SheetClose>
            </SheetClose>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-b border-solid py-5">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={handleSingOut}
          >
            <LogOutIcon size={18} />
            Sair da Conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
