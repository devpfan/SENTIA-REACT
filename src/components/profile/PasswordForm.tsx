
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key } from "lucide-react";

interface PasswordFormProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: () => void;
}

export const PasswordForm = ({ formData, onChange, onChangePassword }: PasswordFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cambiar contraseña</CardTitle>
        <CardDescription>
          Actualiza tu contraseña para mantener tu cuenta segura
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Contraseña actual</Label>
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-gray-500" />
            <Input 
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={onChange}
              className="flex-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nueva contraseña</Label>
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-gray-500" />
              <Input 
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={onChange}
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-gray-500" />
              <Input 
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={onChange}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        <Button
          onClick={onChangePassword}
          disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
        >
          Cambiar contraseña
        </Button>
      </CardFooter>
    </Card>
  );
};
