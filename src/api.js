import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchReports = () => axios.get(`${API_URL}/reports`);
export const createReport = (report) =>
  axios.post(`${API_URL}/reports`, report);
export const updateReport = (id, report) =>
  axios.put(`${API_URL}/reports/${id}`, report);
export const deleteReport = (id) => axios.delete(`${API_URL}/reports/${id}`);
