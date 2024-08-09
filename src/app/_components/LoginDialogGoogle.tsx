import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

interface LoginDialogGoogleProps {
  triggerContent: ReactNode;
}

const LoginDialogGoogle: React.FC<LoginDialogGoogleProps> = ({
  triggerContent,
}) => {
  const handleLoginGoogleClick = () => signIn("google");
  return (
    <>
      <Dialog>
        <DialogTrigger>{triggerContent}</DialogTrigger>
        <DialogContent className="w-[80%]">
          <DialogHeader>
            <DialogTitle>Faça login na plataforma</DialogTitle>
            <DialogDescription>
              Conecte-se usando sua conta do Google
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="outline"
            className="gap-1 font-bold"
            onClick={handleLoginGoogleClick}
          >
            <Image
              src="/Google.svg"
              alt="fazer login com o google"
              width={18}
              height={18}
            />
            Google
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginDialogGoogle;
