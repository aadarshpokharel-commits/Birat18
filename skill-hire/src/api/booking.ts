import API from "./auth";

export interface BookingRequest {
  workerId: number;
  customerId: number;
  date: string;
  time: string;
  address: string;
  description: string;
}

export interface Booking {
  id: number;
  workerId: number;
  workerUserId: number;
  customerId: number;
  workerName: string;
  customerName: string;
  category: string;
  date: string;
  time: string;
  address: string;
  description: string;
  status: "PENDING" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  price: number;
}

export const createBooking = async (booking: BookingRequest) => {
  const response = await API.post("/bookings", booking);
  return response.data;
};

export const getCustomerBookings = async (customerId: number): Promise<Booking[]> => {
  const response = await API.get<Booking[]>(`/bookings/customer/${customerId}`);
  return response.data;
};

export const getWorkerBookings = async (workerId: number): Promise<Booking[]> => {
  const response = await API.get<Booking[]>(`/bookings/worker/${workerId}`);
  return response.data;
};

export const updateBookingStatus = async (bookingId: number, status: string) => {
  const response = await API.patch(`/bookings/${bookingId}/status`, { status });
  return response.data;
};
