import API from "./auth";
import type { Worker } from "./worker";
import type { Booking } from "./booking";

export interface AdminStats {
  totalUsers: number;
  totalWorkers: number;
  totalCustomers: number;
  totalBookings: number;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "CUSTOMER" | "WORKER" | "ADMIN";
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const { data } = await API.get<AdminStats>("/admin/stats");
  return data;
};

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const { data } = await API.get<AdminUser[]>("/admin/users");
  return data;
};

export const getAdminWorkers = async (): Promise<Worker[]> => {
  const { data } = await API.get<Worker[]>("/admin/workers");
  return data;
};

export const getAdminBookings = async (): Promise<Booking[]> => {
  const { data } = await API.get<Booking[]>("/admin/bookings");
  return data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await API.delete(`/admin/users/${id}`);
};
