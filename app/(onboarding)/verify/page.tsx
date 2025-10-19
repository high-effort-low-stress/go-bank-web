import { onboardingVerifyAction } from "@/actions/onboarding/verifyAction";
import { OnboardingUnverified } from "@/components/onboarding/verify/onboarding-unverified";
import OnboardingVerified from "@/components/onboarding/verify/onboarding-verified";

type VerifyPageProps = {
  searchParams: Promise<{ token?: string }>;
};

const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
  const { token } = await searchParams;

  const verify = await onboardingVerifyAction({ token });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30">
      {verify.success ? <OnboardingVerified /> : <OnboardingUnverified />}
    </div>
  );
};

export default VerifyPage;
