import { FC } from "react";
import BillHistoryComponent from "@/components/settings/billHistory";

const BillingSection: FC = () => {
  return (
    <div className="mb-5">
      <div className="flex flex-col items-center justify-center">
        <p className="font-semibold text-palletGray-200 text-sm mt-8">
          Current plan
        </p>
        <p className="text-3xl mt-5 font-bold">Free Trial</p>
        <a
          href="https://buy.stripe.com/test_00g8zY6hBgsk8IU000"
          className="bg-palletPurple-300 text-white px-3 py-2 text-sm rounded-lg font-light mt-5 mb-8"
        >
          Upgrade plan
        </a>
      </div>
      <hr />
      <p className="font-semibold mt-8 pl-2">Billing History</p>

      <div className="divide-palletPurple-200 divide-dashed divide-y">
        {/* Replace the placeholder below with your dynamic billing history components */}
        <BillHistoryComponent
          date="2019.8.10 11:06 UTC"
          type="Pro subscription (1 year)"
          transactionID="LASH_FLI124SD8CNZ2"
          price="72.82"
        />
        <BillHistoryComponent
          date="2020.8.10 11:06 UTC"
          type="Pro subscription (1 year)"
          transactionID="LASH_FLI124SD8CNZ3"
          price="72.82"
        />
        {/* Add more BillHistoryComponent instances as needed */}
      </div>
    </div>
  );
};

export default BillingSection;
