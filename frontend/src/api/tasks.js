import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = async () => axios.get(`${API_URL}/api/task`);
export const createTask = async (task) => axios.post(`${API_URL}/api/task`, task);
export const updateTask = async (id, task) => axios.put(`${API_URL}/api/task/${id}`, task);
export const deleteTask = async (id) => axios.delete(`${API_URL}/api/task/${id}`);
