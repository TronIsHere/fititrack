import AuthLayout from "@/components/layouts/authLayout";
import { MyPage } from "@/components/types/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { useToast } from "@/components/ui/toasts/use-toast";
import { useAppSelector } from "@/hooks/storeHooks";
import {
  ChangePasswordValidator,
  ForgotPasswordValidator,
  TChangePasswordValidator,
  TForgotPasswordValidator,
} from "@/lib/validators/AuthValidator";
import {
  SendForgotPasswordEmail,
  VerifyForgotPassword,
} from "@/services/userServices";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPasswordVerify: MyPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const submitHandler = async ({
    password,
    confirmPassword,
  }: TChangePasswordValidator) => {
    try {
      setLoading(true);
      const response = await VerifyForgotPassword(
        password,
        confirmPassword,
        token
      );

      if (response.success == true) {
        toast({
          variant: "success",
          description: "Password is changed successfully",
        });
        setTimeout(() => {
          router.replace("/login");
        }, 1000);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePasswordValidator>({
    resolver: zodResolver(ChangePasswordValidator),
  });
  return (
    <>
      {" "}
      <div className="flex flex-row items-center pt-10 md:pt-0">
        <Link href={"#"}>
          <Image
            src={"/images/forgot-password.svg"}
            alt="fitittrack forgot password"
            width={200}
            height={60}
            className=""
          />
        </Link>
      </div>
      <div className="flex flex-col items-center px-5 md:px-0 pb-10 md:pb-0">
        <p className="w-3/6 inline-block mt-10">
          We will guide you through creating a new password. Please select it
          carefully and ensure it's strong for enhanced security.
        </p>
        <form
          action=""
          className="w-3/6 mt-16"
          onSubmit={handleSubmit(submitHandler)}
        >
          <label htmlFor="password" className="text-sm">
            New password
          </label>
          <Input
            isPassword={true}
            type={"password"}
            {...register("password")}
            className="rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full mt-3 mb-8"
            placeholder=""
          ></Input>
          {errors.password && (
            <p className="text-sm text-palletRed-500  mt-2">
              {errors.password.message}
            </p>
          )}
          <label htmlFor="password" className="text-sm">
            Confirm New password
          </label>
          <Input
            isPassword={true}
            type={"password"}
            {...register("confirmPassword")}
            className="rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full mt-3"
            placeholder=""
          ></Input>
          {errors.confirmPassword && (
            <p className="text-sm text-palletRed-500  mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
          <LoadingButton loadingState={isLoading} label="Reset Password" />
        </form>
      </div>
    </>
  );
};
// export async function getServerSideProps(context: any) {
//   const { query } = context;
//   const token = query.token;

//   if (token) {
//     return { redirect: { destination: "/forgot-password", permanent: false } };
//   }

//   return { props: { token } };
// }
ForgotPasswordVerify.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
export default ForgotPasswordVerify;
