import API from "./auth";

export interface Category {
  id: number;
  slug: string;
  name: string;
  icon: string;
  color: string;
  workers: number;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await API.get("/categories");
  return data;
}
