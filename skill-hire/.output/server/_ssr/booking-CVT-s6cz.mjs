import { t as API } from "./auth-dZ0GvIja.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/booking-CVT-s6cz.js
var createBooking = async (booking) => {
	return (await API.post("/bookings", booking)).data;
};
var getCustomerBookings = async (customerId) => {
	return (await API.get(`/bookings/customer/${customerId}`)).data;
};
var getWorkerBookings = async (workerId) => {
	return (await API.get(`/bookings/worker/${workerId}`)).data;
};
var updateBookingStatus = async (bookingId, status) => {
	return (await API.patch(`/bookings/${bookingId}/status`, { status })).data;
};
//#endregion
export { updateBookingStatus as i, getCustomerBookings as n, getWorkerBookings as r, createBooking as t };
