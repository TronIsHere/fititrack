import LoginForm from "@/components/forms/auth/loginForm";
import AuthLayout from "@/components/layouts/authLayout";
import { MyPage } from "@/components/types/nextjs";
import { useToast } from "@/components/ui/toasts/use-toast";
import { useAppSelector } from "@/hooks/storeHooks";
import {
  LoginValidator,
  TLoginValidator,
} from "@/lib/validators/AuthValidator";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage: MyPage = () => {
  const darkModeState = useAppSelector((state) => state.user.darkMode);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValidator>({
    resolver: zodResolver(LoginValidator),
  });
  const submitHandler = async ({ email, password }: TLoginValidator) => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result?.error) {
      toast({
        variant: "success",
        description: "logged in!",
        duration: 500,
      });
      router.push("/dashboard");
    } else {
      if (
        result.error ===
        "User account is not verified. Please verify your account."
      ) {
        sessionStorage.setItem("emailForVerification", email);
        router.push("/email-verify");
      }
      toast({
        variant: "destructive",
        description: result?.error,
      });
      setLoading(false);
    }
  };
  return (
    <>
      <LoginForm
        onSubmit={handleSubmit(submitHandler)}
        register={register}
        errors={errors}
        isLoading={loading}
        darkModeState={darkModeState}
      />
    </>
  );
};
LoginPage.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (session) {
    return { redirect: { destination: "/dashboard", permanent: false } };
  }

  return { props: { session } };
}

export default LoginPage;
