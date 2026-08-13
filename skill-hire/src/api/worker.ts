import API from "./auth";

export interface Worker {
  id: number;
  name: string;
  profession: string;
  category: string;
  rating: number;
  reviewsCount: number;
  experience: number;
  price: number;
  location: string;
  languages: string[];
  skills: string[];
  about: string;
  available: boolean;
  completedJobs: number;
  verified: boolean;
  initials: string;
  color: string;
  photoUrl?: string | null;
}

export const getWorkers = async (): Promise<Worker[]> => {
  const { data } = await API.get("/workers");
  return data;
};

export const getWorker = async (id: number): Promise<Worker> => {
  const { data } = await API.get(`/workers/${id}`);
  return data;
};

export const getWorkerByUserId = async (userId: number): Promise<Worker> => {
  const { data } = await API.get(`/workers/user/${userId}`);
  return data;
};
export interface WorkerProfileRequest {
  categorySlug: string;
  profession: string;
  experience: number;
  price: number;
  location: string;
  languages: string[];
  skills: string[];
  about: string;
  available: boolean;
  photoUrl?: string;
}

export const saveWorkerProfile = async (
  userId: number,
  profile: WorkerProfileRequest,
): Promise<Worker> => {
  const { data } = await API.put(`/workers/profile/${userId}`, profile);
  return data;
};
