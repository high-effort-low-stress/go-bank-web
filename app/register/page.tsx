import { CreateUserAccountForm } from "@/components/user-account/create-user-account-form";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <section
        id="create-account-form-section"
        className="flex flex-col m-4 w-full"
      >
        <CreateUserAccountForm />
      </section>
    </div>
  );
};

export default RegisterPage;
