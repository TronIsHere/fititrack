import { FC } from "react";
import PriceCards from "../ui/priceCards";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { GiCrown } from "react-icons/gi";
const BillingSection: FC = () => {
  const { paid } = useSelector((state: RootState) => state.user);

  return (
    <div className="mb-5">
      <div className="flex flex-col items-center justify-center">
        <p className="font-semibold text-palletGray-200 text-sm mt-8">
          Current plan
        </p>
        <div className="flex flex-col items-center mt-5">
          {paid && <GiCrown color="#FFD700" size={50} />}
          <p className="text-3xl  font-bold">{paid ? "Pro" : "Free Trial"}</p>
          {paid && <p className="text-muted-foreground pt-3">forever ;)</p>}
        </div>
      </div>
      <hr />
      {!paid && (
        <div className="mt-10 px-4">
          <PriceCards
            paymentLink="https://buy.stripe.com/test_00g8zY6hBgsk8IU000"
            options={false}
            compact={true}
          />
        </div>
      )}
    </div>
  );
};

export default BillingSection;
