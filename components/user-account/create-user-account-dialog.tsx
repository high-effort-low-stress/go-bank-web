import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateUserAccountForm } from "./create-user-account-form";

interface AccountDialogProps {
  children?: React.ReactNode;
}

export function CreateUserAccountDialog({ children }: AccountDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateUserAccountForm />
      </DialogContent>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Fechar
          </Button>
        </DialogClose>
      </DialogFooter>
    </Dialog>
  );
}
