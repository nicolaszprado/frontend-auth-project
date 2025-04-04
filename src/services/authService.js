
const API_URL = "http://localhost:8080/auth"; 


export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Credenciais inválidas");
      } else {
        throw new Error("Erro no servidor. Tente novamente mais tarde.");
      }
    }

    const data = await response.json();
    
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("user_name", data.username);
    
    return data;
  } catch (error) {
    console.error("Erro de login:", error);
    throw error;
  }
};


export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Email já existe");
      } else {
        throw new Error("Erro no servidor. Tente novamente mais tarde.");
      }
    }

    const data = await response.json();
    
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("user_name", data.username);
    
    return data;
  } catch (error) {
    console.error("Erro de registro:", error);
    throw error;
  }
};


export const isAuthenticated = () => {
  const token = localStorage.getItem("auth_token");
  return !!token;
};


export const logoutUser = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_name");
};


export const getToken = () => {
  return localStorage.getItem("auth_token");
};


export const getUsername = () => {
  return localStorage.getItem("user_name");
};
