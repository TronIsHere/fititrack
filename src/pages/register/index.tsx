import RegistrationForm from "@/components/forms/registrationForm";
import AuthLayout from "@/components/layouts/authLayout";
import { MyPage } from "@/components/types/nextjs";
import { useToast } from "@/components/ui/toasts/use-toast";
import {
  RegisterValidator,
  TRegisterValidator,
} from "@/lib/validators/AuthValidator";
import { createUser } from "@/services/userServices";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const RegisterPage: MyPage = () => {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterValidator>({
    resolver: zodResolver(RegisterValidator),
  });

  const submitHandler = async ({
    email,
    password,
    name,
    dob,
  }: TRegisterValidator) => {
    try {
      setLoading(true);

      const response = await createUser(email, password, name);

      if (response.error) {
        throw new Error("Something went wrong.");
      }

      if (response.status === 409) {
        toast({
          variant: "destructive",
          description:
            "Email already registered. Please log in or reset your password if needed.",
        });
      } else if (response.status === 201) {
        sessionStorage.setItem("emailForVerification", email);
        toast({
          variant: "success",
          description: "Register complete. Please Verify!",
          duration: 500,
        });
        router.push("/email-verify");
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <RegistrationForm
        onSubmit={handleSubmit(submitHandler)}
        register={register}
        errors={errors}
        isLoading={loading}
        darkModeState={darkModeState}
      />
    </>
  );
};

RegisterPage.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
export default RegisterPage;
