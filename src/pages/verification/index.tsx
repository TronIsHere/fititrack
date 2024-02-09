import { useToast } from "@/components/ui/toasts/use-toast";
import { getTokenVerificationOnServer } from "@/services/token";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const VerificationPage = ({}) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    const verifyAndSignIn = async () => {
      console.log(token);
      if (!token) {
        // Show error
        toast({
          variant: "destructive",
          description: "No token provided.",
          duration: 5000,
        });
        return;
      }

      try {
        const data = await getTokenVerificationOnServer(token);
        toast({
          variant: "success",
          description: "Verification complete. Please log in.",
          duration: 5000,
        });
        router.replace("/login");
      } catch (error) {
        // Handle errors appropriately
        toast({
          variant: "destructive",
          description: "An error occurred.",
          duration: 5000,
        });
        console.error(error);
      }
    };

    verifyAndSignIn();
  }, []);
  return (
    <>
      <div className=""></div>
    </>
  );
};
export async function getServerSideProps(context: any) {
  // const session = await getSession({ req: context.req });
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/dashboard",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {},
  };
}
export default VerificationPage;
