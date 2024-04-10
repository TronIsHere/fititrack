import { FC } from "react";
import { Button } from "./button";

interface LoadingButtonProp {
  loadingState: boolean;
  label: string;
}

const LoadingButton: FC<LoadingButtonProp> = ({ loadingState, label }) => {
  return (
    <Button
      variant={"primary"}
      className=" text-white mt-8 p-3 rounded-lg flex justify-center text-sm w-full"
      disabled={loadingState}
    >
      {loadingState ? <div className="donut"></div> : label}
    </Button>
  );
};

export default LoadingButton;
