import type { UserData } from "@/types/user";

// PETICIONES PARA EMPLEADOS SEGÚN LOS ENDPOINTS
export const userService = {
  async getAllUsers(): Promise<UserData[]> {
    const response = await fetch("http://localhost:8080/usuarios/all");
    if (!response.ok) throw new Error("Error al obtener usuarios");
    const users = await response.json();
    // Ajustar si la estructura del backend es diferente
    return users.map((u: any) => ({
      id: u.id,
      name: u.nombre + (u.apellido ? " " + u.apellido : ""),
      email: u.email,
      department: u.departamento || "Sin asignar",
      role: u.rol === "ADMIN" ? "Admin" : "Usuario",
      status: u.estado === "A" ? "active" : "inactive",
      lastLogin: u.ultimoAcceso || "-",
      streak: u.racha || 0,
      points: u.puntos || 0,
      // Para evitar el problema de Request Header Too Large al incluir fotos codificadas
      // solo guardamos el ID para luego cargar la imagen por separado
      avatarId: u.id,
      participation: 0, // Placeholder until we have a way to calculate this
    }));
  },
  
  async getUserAvatar(id: number): Promise<string | null> {
    try {
      const response = await fetch(`http://localhost:8080/usuarios/foto/${id}`);
      
      if (!response.ok) return null;
      
      // Intentar obtener como texto primero
      const responseText = await response.text();
      
      try {
        // Verificar si es un JSON (lo que estaría causando el error)
        const jsonData = JSON.parse(responseText);
        
        // Si hay una propiedad 'foto' en el JSON, usar ese valor
        if (jsonData && typeof jsonData.foto === 'string') {
          const imageData = jsonData.foto;
          // Asegurarse que no incluimos el prefijo data:image múltiples veces
          return `data:image/jpeg;base64,${imageData}`;
        }
        
        return null;
      } catch (e) {
        // No es un JSON, probablemente es directamente el base64
        // Verificar si ya es un string base64 o una URL
        if (responseText.startsWith('data:image') || responseText.startsWith('http')) {
          return responseText;
        }
        
        // En caso que sea solo el contenido base64 sin el prefijo
        return `data:image/jpeg;base64,${responseText}`;
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
      return null;
    }
  },

  async createUser(data: any): Promise<any> {
    // If the photo is provided and has a data:image prefix, we need to strip that part
    if (data.foto && typeof data.foto === 'string' && data.foto.startsWith('data:')) {
      // Extract the base64 part only (remove the data:image/jpeg;base64, prefix)
      const base64Data = data.foto.split(',')[1];
      data.foto = base64Data; // Just send the pure base64 data without the prefix
    }
    
    const response = await fetch("http://localhost:8080/usuarios/crear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear usuario: ${errorText}`);
    }
    
    return await response.json();
  },
  async deleteUser(id: string | number) {
    const response = await fetch(`http://localhost:8080/usuarios/delete/${id}`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Error al desactivar usuario");
    return await response.json();
  },
  async reactivateUser(id: string | number) {
    const response = await fetch(`http://localhost:8080/usuarios/reactivar/${id}`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Error al reactivar usuario");
    return await response.json();
  },
  async getUserById(id: string | number): Promise<UserData> {
    const response = await fetch(`http://localhost:8080/usuarios/${id}`);
    if (!response.ok) throw new Error("Error al obtener usuario");
    return await response.json();
  },
};
