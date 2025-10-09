import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountDialog({ open, onOpenChange }: AccountDialogProps) {
  const [step, setStep] = useState<"cpf" | "full">("cpf");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleCpfSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cpf.trim()) {
      setStep("full");
    }
  };

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
    setStep("cpf");
    setCpf("");
    setPhone("");
    setEmail("");
    setTermsAccepted(false);
    onOpenChange(false);
  };

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  if (step === "cpf") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md border-0 p-0 gap-0">
          <DialogTitle></DialogTitle>
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Enter your CPF to get started with NeoBank
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCpfSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(formatCpf(e.target.value))}
                    maxLength={14}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    );
  }

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
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
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
                  onClick={() => setStep("cpf")}
                  className="flex-1"
                >
                  Back
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
