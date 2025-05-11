
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Settings } from "lucide-react";
import { ActivityHistory, type Activity } from "@/components/profile/ActivityHistory";
import { OverviewTab } from "@/components/profile/tabs/OverviewTab";
import { SettingsTab } from "@/components/profile/tabs/SettingsTab";
import type { UserInfo } from "@/types/user";

interface ProfileActionsProps {
  tab: string;
  setTab: (value: string) => void;
  activities: ReadonlyArray<Activity>;
  userData: UserInfo;
  isEditing: boolean;
  formData: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    foto: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: () => void;
}

export const ProfileActions = ({
  tab,
  setTab,
  activities,
  userData,
  isEditing,
  formData,
  onEdit,
  onCancel,
  onSave,
  onChange,
  onChangePassword,
}: ProfileActionsProps) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <Tabs defaultValue="overview" value={tab} onValueChange={setTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Resumen</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Actividad</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Ajustes</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewTab userData={userData} />
        </TabsContent>
        
        <TabsContent value="activity">
          <ActivityHistory activities={activities} />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab
            isEditing={isEditing}
            formData={formData}
            userData={userData}
            onEdit={onEdit}
            onCancel={onCancel}
            onSave={onSave}
            onChange={onChange}
            onChangePassword={onChangePassword}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
