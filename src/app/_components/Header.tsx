import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import HamburgerMenu from "./Hamburger-menu";
import Link from "next/link";

const Header = () => {
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
        <HamburgerMenu />
      </CardContent>
    </Card>
  );
};

export default Header;
