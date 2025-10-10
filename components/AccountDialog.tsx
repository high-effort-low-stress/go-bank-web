import { useState } from "react";
import { formatPhoneNunmber } from "@/utils/formatters";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountDialog({ open, onOpenChange }: AccountDialogProps) {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleFullSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (termsAccepted) {
      // Handle account creation
      console.log("Account created:", { cpf, phone, email });
      // Reset and close
      handleClose();
    }
  };

  const handleClose = () => {
    setPhone("");
    setEmail("");
    setCpf("");
    setTermsAccepted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-full h-full m-0 p-0 flex flex-col">
        <div className="flex-1 overflow-auto">
          <div className="container max-w-2xl mx-auto px-4 py-8">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-center">
                Complete your registration
              </DialogTitle>
              <DialogDescription className="text-center">
                Fill in your details to create your NeoBank account
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleFullSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cpf-full">CPF</Label>
                <Input
                  id="cpf-full"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  maxLength={14}
                  required
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNunmber(e.target.value))}
                  maxLength={15}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-start gap-3 py-4">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked as boolean)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    I agree to the terms and conditions
                  </label>
                  <p className="text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!termsAccepted}
                  className="flex-1"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
