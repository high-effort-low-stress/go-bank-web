import { OnboardingUnverified } from "@/components/onboarding/verify/onboarding-unverified";
import OnboardingVerified from "@/components/onboarding/verify/onboarding-verified";
import { onboardingVerifyAction } from "@/lib/actions/onboarding/verifyAction";

type VerifyPageProps = {
  searchParams: { token?: string };
};

const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
  const token = searchParams.token;

  const verify = await onboardingVerifyAction(token);

  if (!verify.success) {
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30">
      <OnboardingUnverified />
    </div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30">
      <OnboardingVerified />
    </div>
  );
};

export default VerifyPage;
