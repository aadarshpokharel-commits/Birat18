import API from "./auth";

export interface GalleryPhoto {
  id: number;
  imageUrl: string;
  caption: string;
  uploadedAt: string;
}

export const getGallery = async (workerId: number): Promise<GalleryPhoto[]> => {
  const { data } = await API.get<GalleryPhoto[]>(`/gallery/worker/${workerId}`);
  return data;
};

export const addGalleryPhoto = async (
  workerId: number,
  imageUrl: string,
  caption: string,
): Promise<GalleryPhoto> => {
  const { data } = await API.post<GalleryPhoto>(`/gallery/worker/${workerId}`, {
    imageUrl,
    caption,
  });
  return data;
};

export const updateProfilePhoto = async (workerId: number, imageUrl: string): Promise<void> => {
  await API.put(`/gallery/worker/${workerId}/photo`, { imageUrl });
};

export const deleteGalleryPhoto = async (photoId: number): Promise<void> => {
  await API.delete(`/gallery/${photoId}`);
};

// Convert a File to base64 string
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
