import { Theme } from "@/components/types/dashboardTypes";
import { themes } from "@/lib/themeUtils";
import Image from "next/image";
import { FC } from "react";
interface ThemeSelectorProps {
  currentTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
}
const ThemeSelector: FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  return (
    <div className="flex justify-center gap-5 mt-5">
      {themes.map((theme) => (
        <div
          key={theme}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onSelectTheme(theme)}
        >
          <Image
            src={`/images/${theme}Theme.png`}
            className={`rounded-md transition-all duration-500 ${
              currentTheme === theme ? "ring-4 ring-palletPurple-300" : ""
            }`}
            alt={`${theme} theme`}
            width={200}
            height={200}
          />
          <span
            className={`mt-2 text-sm ${
              currentTheme === theme
                ? "text-palletPurple-300"
                : "text-palletGray-100"
            }`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ThemeSelector;
