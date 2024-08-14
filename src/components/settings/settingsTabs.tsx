import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsTabsProps {
  generalContent: React.ReactNode;
  billingContent: React.ReactNode;
}

const SettingsTabs: FC<SettingsTabsProps> = ({
  generalContent,
  billingContent,
}) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="w-full flex justify-start bg-white border-palletGray-100 border-b-2 rounded-none dark:bg-darkPrimary">
        <TabsTrigger
          value="general"
          className="rounded-none tab-trigger dark:tab-trigger2"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="billing"
          className="rounded-none tab-trigger dark:tab-trigger2"
        >
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general">{generalContent}</TabsContent>
      <TabsContent value="billing">{billingContent}</TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
