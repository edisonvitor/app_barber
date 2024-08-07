"use client";

import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string;
}

const handleCopyClick = (phone: string) => {
  navigator.clipboard.writeText(phone);
  toast.success("Número copiado!");
};

const PhoneItem = ({ phone }: PhoneItemProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyClick(phone)}
      >
        Copiar
      </Button>
    </div>
  );
};

export default PhoneItem;
