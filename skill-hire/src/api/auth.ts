import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
    role: role.toUpperCase(),
  });

  return response.data;
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export default API;
