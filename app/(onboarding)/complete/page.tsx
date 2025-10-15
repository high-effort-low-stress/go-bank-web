import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import { OnboardingCompleteForm } from "@/components/onboarding/complete/onboarding-complete-form";

const CompletePage = async () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30">
      <Suspense
        fallback={
          <div>
            Carregando...
            <Loader2Icon className="animate-spin" />
          </div>
        }
      >
        <OnboardingCompleteForm />
      </Suspense>
    </div>
  );
};

export default CompletePage;
