import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import HamburgerMenu from "./Hamburger-menu";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.svg" alt="BarberShop Logo" width={120} height={18} />
        <HamburgerMenu />
      </CardContent>
    </Card>
  );
};

export default Header;
