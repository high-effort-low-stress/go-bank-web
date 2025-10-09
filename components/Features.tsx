import { Bell, Globe, PieChart, Shield, Smartphone, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Instant Transfers",
    description:
      "Send and receive money instantly with zero fees to other NeoBank users worldwide.",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your money is protected with military-grade encryption and biometric authentication.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Manage your finances on the go with our intuitive iOS and Android apps.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Spend abroad with no foreign transaction fees and access your money anywhere.",
  },
  {
    icon: PieChart,
    title: "Smart Insights",
    description:
      "Get personalized financial insights and budgeting tools powered by AI.",
  },
  {
    icon: Bell,
    title: "Real-time Alerts",
    description:
      "Stay informed with instant notifications for every transaction and activity.",
  },
];

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="mb-4">Everything you need in one app</h2>
          <p className="text-muted-foreground">
            Powerful features designed to give you complete control over your
            finances
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3>{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
