
import { UserInfo } from "@/types/user";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { PasswordForm } from "@/components/profile/PasswordForm";

interface SettingsTabProps {
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
  userData: UserInfo;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: () => void;
}

export const SettingsTab = ({
  isEditing,
  formData,
  userData,
  onEdit,
  onCancel,
  onSave,
  onChange,
  onChangePassword,
}: SettingsTabProps) => {
  return (
    <>
      <ProfileForm
        isEditing={isEditing}
        formData={formData}
        userData={userData}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={onSave}
        onChange={onChange}
      />
      
      <div className="mt-6">
        <PasswordForm
          formData={formData}
          onChange={onChange}
          onChangePassword={onChangePassword}
        />
      </div>
    </>
  );
};
