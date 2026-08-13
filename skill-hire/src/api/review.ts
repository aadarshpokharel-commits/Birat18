import API from "./auth";

export interface Review {
  id: number;
  reviewerName: string;
  initials: string;
  color: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const getReviews = async (workerId: number): Promise<Review[]> => {
  const { data } = await API.get<Review[]>(`/reviews/worker/${workerId}`);
  return data;
};

export const addReview = async (
  workerId: number,
  reviewerId: number,
  rating: number,
  comment: string,
): Promise<Review> => {
  const { data } = await API.post<Review>(`/reviews/worker/${workerId}`, {
    reviewerId,
    rating,
    comment,
  });
  return data;
};
