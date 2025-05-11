
export interface UserData {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
  participation?: number;
  streak: number;
  points: number;
  avatar?: string;
  avatarId?: number;
  foto?: string;
}

export interface UserInfo {
  nombre: string;
  apellido: string;
  email: string;
  departamento: string;
  rol: string;
  telefono: string;
  cargo: string;
  foto: string;
  points: number;
  nextReward: number;
  streak: number;
  dateJoined: string;
  badges: Array<{
    name: string;
    description: string;
    date: string;
  }>;
}

export interface UserUpdateRequest {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}
