import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCpf } from "@/utils/formatters";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function CpfCard() {
  const [cpf, setCpf] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("CPF submitted:", cpf);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Open your account</CardTitle>
        <CardDescription>
          Start your journey with NeoBank. Enter your CPF to begin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cpf-input">CPF</Label>
            <Input
              id="cpf-input"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              maxLength={14}
              required
            />
          </div>
          <Button type="submit" className="w-full gap-2">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
