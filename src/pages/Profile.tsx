
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { useProfileData } from "@/hooks/useProfileData";
import { useProfileForm } from "@/hooks/useProfileForm";

const Profile = () => {
  const [tab, setTab] = useState("overview");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { userData, loading } = useProfileData();
  const {
    isEditing,
    formData,
    setIsEditing,
    handleInputChange,
    handleImageChange,
    handleSaveProfile,
    handleChangePassword,
  } = useProfileForm(userData, setImagePreview);

  // Usamos la foto del userData si no hay preview
  const displayImage = imagePreview || userData.foto || null;

  if (loading) {
    return (
      <PageLayout>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando perfil...</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mi perfil</h1>
          <p className="text-gray-600">
            Gestiona tu perfil y revisa tu progreso
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileHeader
            userData={userData}
            imagePreview={displayImage}
            isEditing={isEditing}
            onImageChange={handleImageChange}
          />

          <ProfileActions
            tab={tab}
            setTab={setTab}
            activities={[]} // Sending empty array instead of mockup data
            userData={userData}
            isEditing={isEditing}
            formData={formData}
            onEdit={() => setIsEditing(true)}
            onCancel={() => setIsEditing(false)}
            onSave={handleSaveProfile}
            onChange={handleInputChange}
            onChangePassword={handleChangePassword}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
