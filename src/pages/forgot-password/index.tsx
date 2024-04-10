import AuthLayout from "@/components/layouts/authLayout";
import { MyPage } from "@/components/types/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { useToast } from "@/components/ui/toasts/use-toast";
import {
  ForgotPasswordValidator,
  TForgotPasswordValidator,
} from "@/lib/validators/AuthValidator";
import { SendForgotPasswordEmail } from "@/services/userServices";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPassword: MyPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const redirectAuth = () => {
    router.replace("/login");
  };
  const submitHandler = async ({ email }: TForgotPasswordValidator) => {
    try {
      setLoading(true);

      const response = await SendForgotPasswordEmail(email);
      if (response.success == true) {
        toast({
          variant: "success",
          description: "Link sent, please check your email",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong, please try again later",
        });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordValidator>({
    resolver: zodResolver(ForgotPasswordValidator),
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
          We will Send you a magic link that will reset your password when you
          click on it. please insert your previously registered email
        </p>
        <form
          action=""
          className="w-3/6"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            {...register("email")}
            className="rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full mt-10"
            placeholder="example@test.com"
          ></Input>
          {errors.email && (
            <p className="text-sm text-palletRed-500  mt-2">
              {errors.email.message}
            </p>
          )}
          <div className="grid grid-cols-2 gap-10">
            <Button
              type="button"
              variant={"destructive"}
              className=" mt-8 p-3 rounded-lg flex justify-center text-sm w-full bg-cancelRed"
              onClick={() => redirectAuth()}
            >
              Cancel
            </Button>
            <LoadingButton loadingState={isLoading} label="Reset Password" />
          </div>
        </form>
      </div>
    </>
  );
};
ForgotPassword.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
export default ForgotPassword;
