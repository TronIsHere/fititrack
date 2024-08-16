import { FC } from "react";
import { UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeSelector from "@/components/ui/settings/themeSelector";
import { TSettingsGeneralValidator } from "@/lib/validators/AuthValidator";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Theme } from "../types/dashboardTypes";
import Image from "next/image";

interface ProfileFormProps {
  register: UseFormRegister<TSettingsGeneralValidator>;
  handleSubmit: UseFormHandleSubmit<TSettingsGeneralValidator>;
  handleSave: (data: TSettingsGeneralValidator) => void;
  handleChangePassword: () => void;
  name: string;
  email: string;
  dob: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ProfileForm: FC<ProfileFormProps> = ({
  register,
  handleSubmit,
  handleSave,
  handleChangePassword,
  name,
  email,
  dob,
  theme,
  setTheme,
}) => {
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="pl-2 pt-4 flex flex-col md:flex-row justify-between items-center pr-2">
        <div className="flex">
          <div>
            {/* Avatar Component */}
            <div className="w-16 h-16 bg-primary-foreground rounded-full flex justify-center">
              <Image
                src="/images/dumbbell.png"
                alt=""
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center pl-4">
            <span className="font-semibold text-palletPurple-900 dark:text-white">
              {capitalizeFirstLetter(name)}
            </span>
            <span className="text-palletGray-200 text-sm mt-1">{email}</span>
          </div>
        </div>
        {/* <div>
          <input type="file" id="fileInput" className="hidden" />
          <label
            htmlFor="fileInput"
            className="text-sm mt-5 md:mt-0 w-full md:w-auto bg-palletPurple-300 text-white h-10 rounded-lg px-4 flex justify-center items-center cursor-pointer"
          >
            Change avatar
          </label>
        </div> */}
      </div>

      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col pl-2 pt-10 w-full">
          <span className="pl-0.5">Name</span>
          <Input
            {...register("name")}
            defaultValue={name}
            className="border mt-2 text-sm border-palletGray-100 dark:bg-darkPrimary"
          />
        </div>

        <div className="flex flex-col pl-2 pt-8 w-full">
          <span className="pl-0.5">Email</span>
          <Input
            defaultValue={email}
            type="email"
            className="border border-palletGray-100 mt-2 dark:bg-darkPrimary cursor-not-allowed"
            disabled
          />
        </div>

        <div className="flex flex-col pl-2 pt-8">
          <span className="pl-0.5">Date of Birth</span>
          <Input
            defaultValue={dob}
            {...register("dob")}
            type="date"
            className="border border-palletGray-100 mt-2 dark:bg-darkPrimary"
          />
        </div>

        <div className="flex flex-col pl-2 pt-8">
          <span className="pl-0.5">Password</span>
          <Input
            defaultValue="••••••••"
            type="password"
            className="border border-palletGray-100 mt-2 dark:bg-darkPrimary"
            disabled
          />
          <Button
            variant="trinary"
            className="mt-2"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </div>

        <div className="pl-2 pt-8">
          <span className="pl-0.5">Theme</span>
          <ThemeSelector currentTheme={theme} onSelectTheme={setTheme} />
        </div>
      </div>

      <div className="flex justify-end mt-10 mb-4 pr-2">
        <Button type="submit" variant="primary">
          Save Profile
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
