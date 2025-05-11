
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, User, Mail, Phone, Building } from "lucide-react";
import { UserInfo } from "@/types/user";

interface ProfileFormProps {
  isEditing: boolean;
  formData: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
  };
  userData: UserInfo;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileForm = ({
  isEditing,
  formData,
  userData,
  onEdit,
  onCancel,
  onSave,
  onChange
}: ProfileFormProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Información personal</CardTitle>
            <CardDescription>
              Actualiza tu información de contacto
            </CardDescription>
          </div>
          {!isEditing && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <Input 
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={onChange}
                disabled={!isEditing}
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="apellido">Apellido</Label>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <Input 
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={onChange}
                disabled={!isEditing}
                className="flex-1"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <Input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                disabled={!isEditing}
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <Input 
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={onChange}
                disabled={!isEditing}
                className="flex-1"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo</Label>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <Input 
                id="cargo"
                value={userData.cargo}
                disabled
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <Input 
                id="departamento"
                value={userData.departamento}
                disabled
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end border-t pt-4">
          <Button variant="outline" className="mr-2" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            Guardar cambios
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
