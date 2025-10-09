import { Check, Shield } from "lucide-react";

const securityFeatures = [
  "FDIC insured up to $250,000",
  "256-bit encryption on all data",
  "Two-factor authentication",
  "Biometric login (Face ID / Touch ID)",
  "Real-time fraud monitoring",
  "Instant card freeze/unfreeze",
];

export function SecuritySection() {
  return (
    <section id="security" className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2>Your security is our priority</h2>
          <p className="text-muted-foreground">
            We use cutting-edge security measures to keep your money and data
            safe. Your account is protected with multiple layers of security.
          </p>

          <div className="space-y-3">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted rounded-2xl p-8 h-80 flex items-center justify-center">
          <div className="text-muted-foreground text-center">
            <Shield className="h-32 w-32 mx-auto mb-4 opacity-20" />
            <p>Security Illustration</p>
          </div>
        </div>
      </div>
    </section>
  );
}
