import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface UnskippablePopupProps {
  darkMode: boolean;
}

const UnskippablePopup: FC<UnskippablePopupProps> = ({ darkMode }) => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-[525px] max-w-[350px]"
        darkMode={darkMode}
        showCloseIcon={false}
      >
        <DialogHeader>
          <div className=" flex justify-center py-5">
            {darkMode ? (
              <img src="/images/logoDark.svg" alt="" className="w-1/2" />
            ) : (
              <img src="/images/logo.svg" alt="" className="w-1/2" />
            )}
          </div>
          <strong>OH NO...</strong>
          <DialogTitle>Your Free Trial Has Ended</DialogTitle>
          <DialogDescription>
            <p className="pt-5">
              Your free trial period has ended. To continue using our services,
              please upgrade your account.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-center">
          <Link href="/dashboard/settings">
            <Button variant="primary">Upgrade Now</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnskippablePopup;
