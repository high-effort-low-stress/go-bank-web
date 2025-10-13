import { Suspense } from "react";
import { OnboardingCompleteForm } from "@/components/onboarding/onboarding-complete-form";

const CompletePage = async () => {
  return (
    <div>
      register page
      <Suspense>
        <OnboardingCompleteForm />
      </Suspense>
    </div>
  );
};

export default CompletePage;
