
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera } from "lucide-react";
import { UserInfo } from "@/types/user";

interface ProfileHeaderProps {
  userData: UserInfo;
  imagePreview: string | null;
  isEditing: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileHeader = ({ userData, imagePreview, isEditing, onImageChange }: ProfileHeaderProps) => {
  const progressPercentage = userData.nextReward ? (userData.points || 0) / userData.nextReward * 100 : 0;
  
  // Ensure consistent image format
  const formatImageSrc = (src: string | null) => {
    if (!src) return null;
    
    try {
      // Check if it's a JSON string with foto property
      if (src.includes('{"foto":"')) {
        // Extract the base64 part
        const match = src.match(/data:image\/jpeg;base64,(.*)/);
        if (match && match[1]) {
          const jsonStr = match[1];
          try {
            const jsonObj = JSON.parse(jsonStr);
            if (jsonObj && jsonObj.foto) {
              return `data:image/jpeg;base64,${jsonObj.foto}`;
            }
          } catch (e) {
            // Not valid JSON, continue with original
          }
        }
      }
      
      // Return as is if it's already properly formatted
      return src;
    } catch (e) {
      console.error("Error formatting image source:", e);
      return src; // Return original on error
    }
  };
  
  // Determinar qué mostrar en el avatar
  const avatarContent = () => {
    if (imagePreview) {
      return <AvatarImage src={formatImageSrc(imagePreview)} alt={userData.nombre} />;
    } else if (userData.foto) {
      return <AvatarImage src={formatImageSrc(userData.foto)} alt={userData.nombre} />;
    } else {
      return <AvatarFallback>{userData.nombre?.[0]}</AvatarFallback>;
    }
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4 relative">
            <Avatar className="h-24 w-24">
              {avatarContent()}
            </Avatar>
            {isEditing && (
              <label htmlFor="foto" className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  id="foto"
                  name="foto"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <CardTitle>{`${userData.nombre} ${userData.apellido}`}</CardTitle>
          <CardDescription className="space-y-1">
            <div>{userData.cargo}</div>
            <div>{userData.departamento}</div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Puntos</span>
            <span className="font-bold text-lg">{userData.points}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Próxima recompensa</span>
              <span>{userData.points} / {userData.nextReward}</span>
            </div>
            <Progress value={progressPercentage} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
