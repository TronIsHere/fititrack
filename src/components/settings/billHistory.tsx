import { NextPage } from "next";

interface billProps {
  date: string;
  type: string;
  transactionID: string;
  price: string;
}

const BillHistoryComponent: NextPage<billProps> = ({
  date,
  type,
  transactionID,
  price,
}) => {
  return (
    <div className="flex justify-around text-sm mt-5">
      <div className="">
        <p className="text-palletGray-200 mb-2">Date</p>
        <p>{date}</p>
      </div>
      <div className="">
        <p className="text-palletGray-200 mb-2">Type</p>
        <p>{type}</p>
      </div>
      <div className="">
        <p className="text-palletGray-200 mb-2">Transaction ID</p>
        <p>{transactionID}</p>
      </div>
      <div className="">
        <p className="text-palletGray-200 mb-2">Price</p>
        <p>${price} CAD</p>
      </div>
    </div>
  );
};

export default BillHistoryComponent;
